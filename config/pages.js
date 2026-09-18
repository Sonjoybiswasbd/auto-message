/**
 * Page configuration.
 *
 * To add a new page later, just add another object to this array.
 * Each page needs its own Facebook Page Access Token (from Meta Business Suite
 * > Page Settings > Advanced Messaging, or from the Meta App you create).
 *
 * `businessInfo` is plain text describing the shop. This gets fed to the AI
 * so it can answer questions accurately even without a connected store.
 *
 * `woocommerce` is optional. If a page has a real WooCommerce store,
 * fill this in and the bot will look up real product/stock/price info.
 */

module.exports = [
  {
    pageId: '867085463146279',
    pageName: 'Bunonika',
    pageAccessToken: process.env.BUNONIKA_PAGE_ACCESS_TOKEN,
    businessInfo: `Bunonika is a Bangladeshi clothing brand selling men's cotton shirts
(half sleeve, full sleeve, oxford), hoodies, saree, and dhoti/lungi.
100% premium cotton fabric, made in Bunonika's own factory.
Free home delivery and Cash on Delivery available nationwide in Bangladesh.
Website: https://bunonika.com`,
    woocommerce: {
      siteUrl: 'https://bunonika.com',
      consumerKey: process.env.BUNONIKA_WC_CONSUMER_KEY,
      consumerSecret: process.env.BUNONIKA_WC_CONSUMER_SECRET,
    },
  },
  {
    pageId: '135238300461476',
    pageName: 'Vagyashreeshop',
    pageAccessToken: process.env.VAGYASHREESHOP_PAGE_ACCESS_TOKEN,
    // TODO: Update this once you decide exactly what Vagyashreeshop sells.
    // The more detail you put here, the better the AI's answers will be.
    businessInfo: `Vagyashreeshop is a shop that sells products via its Facebook Page.
(Business details not yet provided — update this text with what the shop
actually sells, pricing, delivery policy, etc. so the AI can answer accurately.)`,
    woocommerce: null, // No website yet — sells via Facebook Page only.
  },
];
