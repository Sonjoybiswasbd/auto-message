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
    businessInfo: `Vagyashreeshop is a Bangladeshi clothing shop based in Reazuddin Bazar (Teribazar), Chittagong.
It sells men's traditional/ethnic clothing, mainly for special occasions (weddings, gaye holud,
puja, family photoshoots, mukhe bhaat, etc.). Sells only via this Facebook Page (no website).
 
Products, prices, and delivery (all delivery is nationwide across Bangladesh, cash on delivery):
 
1) Original South Indian Tamil Lungi/Dhoti
   - Price: 880 taka per piece (fixed)
   - Delivery charge: 120 taka
   - Delivery time: 2-4 days
   - Details: 100% cotton fabric, 2 meters / 4.5 hands long, unstitched and uncut, lungi/dhoti only
     (no shirt/panjabi included). Traditional South Indian style, often paired with a shirt or
     panjabi for a festive look.
 
2) Vagyashree Fotua (ফতুয়া)
   - Price: 580 taka per piece
   - Delivery charge: 120 taka
   - Delivery time: 2-5 days
 
3) Vagyashree Katua (কাতুয়া)
   - Price: 680 taka per piece
   - Delivery charge: 120 taka
   - Delivery time: 2-5 days
 
Sizes for Fotua and Katua (chest size and length):
   - M: chest 40", length 28"+
   - L: chest 42", length 29"+
   - XL: chest 44", length 30"+
   - XXL: chest 46", length 31"+
(The lungi/dhoti is one-size, unstitched fabric, so sizing doesn't apply to it.)
 
Payment: Cash on Delivery (COD) only.
 
How to place an order — ask the customer for these details if they want to order:
   - Name
   - Full address
   - Thana (police station area)
   - District
   - Mobile number
   - Size (for Fotua/Katua only)
   - A photo of which product/color they want (if relevant)
 
WhatsApp contact: 01764-359478 (customers can also message here for orders or questions).`,
    woocommerce: null, // No website yet — sells via Facebook Page only.
  },
];
