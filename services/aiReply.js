const axios = require('axios');
const { searchProducts } = require('./woocommerce');

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

/**
 * Generates a reply for an incoming Messenger message.
 *
 * @param {object} pageConfig - the config object for this page (from config/pages.js)
 * @param {string} userMessage - the text the customer sent
 * @param {Array}  history - optional array of {role, content} from earlier in the conversation
 * @returns {Promise<string>} the text to send back to the customer
 */
async function generateReply(pageConfig, userMessage, history = []) {
  const systemPrompt = `You are a helpful, friendly customer service assistant replying to
Facebook Messenger messages on behalf of "${pageConfig.pageName}", a small business in Bangladesh.

Business information:
${pageConfig.businessInfo}

Rules:
- Reply in the same language the customer used (Bangla or English — mixed "Banglish" is fine too).
- Keep replies short and conversational, like a real person texting — 1-4 sentences.
- If you don't know something specific (like real-time stock for a shop with no connected
  store), say so honestly and offer to have a human follow up, rather than guessing.
- Never invent prices, stock numbers, or delivery times that were not given to you.
- Do not mention that you are an AI unless directly asked.`;

  const tools = pageConfig.woocommerce
    ? [
        {
          name: 'search_products',
          description:
            "Search the shop's live product catalog for items matching a keyword (e.g. a product type or color). Use this whenever the customer asks about a specific product, price, or stock availability.",
          input_schema: {
            type: 'object',
            properties: {
              keyword: {
                type: 'string',
                description: 'Search term, e.g. "hoodie" or "half sleeve shirt"',
              },
            },
            required: ['keyword'],
          },
        },
      ]
    : [];

  const messages = [...history, { role: 'user', content: userMessage }];

  let response = await callClaude(systemPrompt, messages, tools);

  // Handle one round of tool use (product lookup) if the model asks for it.
  const toolUseBlock = response.content.find((b) => b.type === 'tool_use');
  if (toolUseBlock) {
    const result = await searchProducts(pageConfig, toolUseBlock.input.keyword);

    messages.push({ role: 'assistant', content: response.content });
    messages.push({
      role: 'user',
      content: [
        {
          type: 'tool_result',
          tool_use_id: toolUseBlock.id,
          content: result || 'No product data available.',
        },
      ],
    });

    response = await callClaude(systemPrompt, messages, tools);
  }

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock ? textBlock.text : "Sorry, I couldn't process that — someone from our team will follow up shortly.";
}

async function callClaude(systemPrompt, messages, tools) {
  const res = await axios.post(
    CLAUDE_API_URL,
    {
      model: MODEL,
      max_tokens: 400,
      system: systemPrompt,
      messages,
      tools,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      timeout: 20000,
    }
  );
  return res.data;
}

module.exports = { generateReply };
