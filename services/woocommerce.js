const axios = require('axios');

/**
 * Searches a page's connected WooCommerce store for products matching a
 * keyword (e.g. "hoodie", "half sleeve shirt"). Returns a short, plain-text
 * summary the AI can quote directly in its reply. Returns null if the page
 * has no connected store, or if the request fails for any reason.
 */
async function searchProducts(pageConfig, keyword) {
  if (!pageConfig.woocommerce || !pageConfig.woocommerce.consumerKey) {
    return null;
  }

  const { siteUrl, consumerKey, consumerSecret } = pageConfig.woocommerce;

  try {
    const response = await axios.get(`${siteUrl}/wp-json/wc/v3/products`, {
      params: {
        search: keyword,
        per_page: 5,
        status: 'publish',
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
      timeout: 8000,
    });

    if (!response.data || response.data.length === 0) {
      return 'No matching products found in the store right now.';
    }

    const lines = response.data.map((p) => {
      const stock = p.stock_status === 'instock' ? 'In Stock' : 'Out of Stock';
      return `- ${p.name} — ৳${p.price} (${stock}) — ${p.permalink}`;
    });

    return lines.join('\n');
  } catch (err) {
    console.error('WooCommerce lookup failed:', err.message);
    return null;
  }
}

module.exports = { searchProducts };
