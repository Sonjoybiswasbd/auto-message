const express = require('express');
const router = express.Router();

const { whatsapp: whatsappConfigs } = require('../config/pages');
const { generateReply } = require('../services/aiReply');
const { sendWhatsAppMessage } = require('../services/facebookApi');

const conversationHistory = new Map(); // key: `${phoneNumberId}:${customerPhone}` -> messages

/**
 * GET /webhook/whatsapp — same verification pattern as the Messenger webhook.
 * You can reuse the same META_VERIFY_TOKEN for this too.
 */
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified.');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

/**
 * POST /webhook/whatsapp — WhatsApp's payload shape is different from
 * Messenger/Instagram: object === 'whatsapp_business_account', and the
 * actual message is nested under entry[].changes[].value.messages[].
 */
router.post('/', async (req, res) => {
  res.status(200).send('EVENT_RECEIVED');

  const body = req.body;
  if (body.object !== 'whatsapp_business_account') return;

  for (const entry of body.entry || []) {
    for (const change of entry.changes || []) {
      const value = change.value;
      const phoneNumberId = value.metadata && value.metadata.phone_number_id;
      const waConfig = whatsappConfigs.find((c) => c.phoneNumberId === phoneNumberId);

      if (!waConfig) {
        console.log(`WhatsApp message for unconfigured number ${phoneNumberId} — ignoring.`);
        continue;
      }

      for (const message of value.messages || []) {
        if (message.type !== 'text') continue; // skip images, voice notes, etc. for now

        const customerPhone = message.from;
        const userText = message.text.body;

        handleIncomingWhatsAppMessage(waConfig, customerPhone, userText).catch((err) =>
          console.error('Error handling WhatsApp message:', err)
        );
      }
    }
  }
});

async function handleIncomingWhatsAppMessage(waConfig, customerPhone, userText) {
  const historyKey = `${waConfig.phoneNumberId}:${customerPhone}`;
  const history = conversationHistory.get(historyKey) || [];

  const reply = await generateReply(waConfig, userText, history);

  await sendWhatsAppMessage(waConfig.phoneNumberId, waConfig.accessToken, customerPhone, reply);

  history.push({ role: 'user', content: userText });
  history.push({ role: 'assistant', content: reply });
  conversationHistory.set(historyKey, history.slice(-20));
}

module.exports = router;
