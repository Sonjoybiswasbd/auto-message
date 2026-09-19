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
    businessInfo: `Bunonika is a Bangladeshi clothing manufacturing company and export-product
collection house. It manufactures quality-standard clothing itself, and also sources/collects
authentic men's items (export-quality collection pieces).

Products: men's cotton shirts (half sleeve, full sleeve, oxford), hoodies, saree, and dhoti/lungi.
100% premium cotton fabric, made in Bunonika's own factory (for manufactured items); other items
are authentic sourced men's export-collection pieces.

Address: 31/7, Gulfam Tower (Ground Floor), Teribazar Main Road, Chittagong. ৩১/৭, গুলফাম টাওয়ার (নিচ তলা), জারা শপের নিচে, টেরিবাজার মেইন রোড, চট্টগ্রাম।
Shop hours: Open every day from 10:00 AM to 10:00 PM.

Pricing:
- Half sleeve shirt: 680 taka if bought in-person at the shop, 780 taka if ordered online.
  Delivery charge is FREE for online orders.

Delivery: Free home delivery nationwide in Bangladesh, Cash on Delivery (COD) available.
Website: https://bunonika.com

Sales instructions for the AI:
- When a customer wants to place an online order, always try to guide/convert them toward
  ordering directly on the website, www.bunonika.com, rather than just taking the order in
  chat. Mention the website and encourage them to complete their purchase there.
- If a customer asks about the shop's location, or says they want to visit in person, actively
  encourage and invite them to come to the shop.
- If the customer appears to be from Chittagong (based on what they say, their location, or
  context), always encourage them to visit the physical shop in person rather than ordering
  online, since it's a local, easy option for them.`,
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
