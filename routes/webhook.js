const express = require('express');
const router = express.Router();

const pages = require('../config/pages');
const { generateReply } = require('../services/aiReply');
const { sendMessage } = require('../services/facebookApi');

// Very simple in-memory conversation history, per customer.
// Good enough for an MVP — resets if the server restarts.
// If you outgrow this later, swap it for a small database table.
const conversationHistory = new Map(); // key: `${pageId}:${psid}` -> array of messages

const HANDOFF_KEYWORDS = ['human', 'agent', 'manager', 'মানুষ', 'কথা বলতে চাই', 'কল করুন'];

/**
 * GET /webhook — Meta calls this once, when you set up the webhook in the
 * Meta App dashboard, to verify you control this server.
 */
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('Webhook verified.');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

/**
 * POST /webhook — Meta calls this every time a customer sends a message
 * to one of the connected Pages.
 */
router.post('/', async (req, res) => {
  // Always respond 200 quickly so Meta doesn't retry/flag the webhook.
  res.status(200).send('EVENT_RECEIVED');

  const body = req.body;
  // 'page' = Messenger (Facebook Page). 'instagram' = Instagram Direct.
  // Both use this same webhook shape, just a different top-level object type.
  if (body.object !== 'page' && body.object !== 'instagram') return;

  for (const entry of body.entry || []) {
    const entryId = entry.id;
    const pageConfig =
      body.object === 'page'
        ? pages.find((p) => p.pageId === entryId)
        : pages.find((p) => p.instagramId === entryId);

    if (!pageConfig) {
      console.log(`Message for unconfigured ${body.object} account ${entryId} — ignoring.`);
      continue;
    }

    for (const event of entry.messaging || []) {
      if (!event.message || !event.message.text || event.message.is_echo) {
        continue; // skip delivery receipts, echoes of our own sent messages, attachments, etc.
      }

      const psid = event.sender.id;
      const userText = event.message.text;

      handleIncomingMessage(pageConfig, psid, userText).catch((err) =>
        console.error('Error handling message:', err)
      );
    }
  }
});

async function handleIncomingMessage(pageConfig, psid, userText) {
  const historyKey = `${pageConfig.pageId}:${psid}`;
  const history = conversationHistory.get(historyKey) || [];

  // Basic human handoff: if the customer explicitly asks for a person,
  // don't let the AI answer — just acknowledge and flag it.
  const wantsHuman = HANDOFF_KEYWORDS.some((kw) =>
    userText.toLowerCase().includes(kw.toLowerCase())
  );

  let reply;
  if (wantsHuman) {
    reply =
      "Sure, connecting you with our team now — someone will reply here shortly. আপনার সাথে আমাদের একজন টিম মেম্বার শীঘ্রই কথা বলবেন।";
    console.log(`[HUMAN HANDOFF REQUESTED] Page: ${pageConfig.pageName}, PSID: ${psid}, Message: "${userText}"`);
  } else {
    reply = await generateReply(pageConfig, userText, history);
  }

  await sendMessage(pageConfig.pageAccessToken, psid, reply);

  history.push({ role: 'user', content: userText });
  history.push({ role: 'assistant', content: reply });
  // Keep only the last 10 turns to limit memory/token usage.
  conversationHistory.set(historyKey, history.slice(-20));
}

module.exports = router;
