const axios = require('axios');

/**
 * Sends a text message back to a customer via the Facebook Send API.
 */
async function sendMessage(pageAccessToken, recipientPsid, text) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/me/messages`,
      {
        recipient: { id: recipientPsid },
        message: { text },
        messaging_type: 'RESPONSE',
      },
      {
        params: { access_token: pageAccessToken },
        timeout: 10000,
      }
    );
  } catch (err) {
    console.error(
      'Failed to send Facebook message:',
      err.response ? JSON.stringify(err.response.data) : err.message
    );
  }
}

module.exports = { sendMessage };
