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

/**
 * Sends a text message via the WhatsApp Cloud API.
 * Note: WhatsApp only allows free-form replies within 24 hours of the
 * customer's last message. Outside that window, you must use a
 * pre-approved message Template instead of plain text.
 */
async function sendWhatsAppMessage(phoneNumberId, accessToken, toPhoneNumber, text) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: toPhoneNumber,
        type: 'text',
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
  } catch (err) {
    console.error(
      'Failed to send WhatsApp message:',
      err.response ? JSON.stringify(err.response.data) : err.message
    );
  }
}

module.exports = { sendMessage, sendWhatsAppMessage };
