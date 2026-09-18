require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const webhookRoutes = require('./routes/webhook');
const pages = require('./config/pages');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bunonika AI Messenger is running.');
});

app.use('/webhook', webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bunonika AI Messenger listening on port ${PORT}`);
  console.log(`Configured pages: ${pages.map((p) => p.pageName).join(', ')}`);
});
