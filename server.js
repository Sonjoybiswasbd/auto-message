require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const webhookRoutes = require('./routes/webhook');
const whatsappWebhookRoutes = require('./routes/whatsappWebhook');
const pages = require('./config/pages');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bunonika AI Messenger is running.');
});

// Handles Messenger (Facebook Pages) AND Instagram Direct — both use the
// same webhook shape, just a different "object" field, which routes/webhook.js
// checks internally.
app.use('/webhook', webhookRoutes);

// WhatsApp uses a different payload shape entirely, so it gets its own path.
app.use('/webhook/whatsapp', whatsappWebhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bunonika AI Messenger listening on port ${PORT}`);
  console.log(`Configured pages: ${pages.map((p) => p.pageName).join(', ')}`);
});
