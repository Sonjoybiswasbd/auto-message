# Bunonika AI Messenger — Phase 1 (2 pages)

An AI auto-reply bot for the "Bunonika" and "Vagyashreeshop" Facebook Pages.
Bunonika's replies use real product/stock data from bunonika.com. Vagyashreeshop's
replies currently use a placeholder business description — update
`config/pages.js` once you know what that shop sells.

This is intentionally simple (no database, no multi-user login, no admin
dashboard) so it's fast to launch and easy to debug. If it works well, it's a
solid foundation to grow into a bigger system later.

---

## 1. Create a Meta App (one-time setup)

1. Go to https://developers.facebook.com/apps and click **Create App**.
2. Choose **"Other"** → **"Business"** as the app type.
3. Once created, on the app dashboard, click **Add Product** and add
   **Messenger**.
4. Under Messenger → Settings → **Access Tokens**, generate a Page Access
   Token for **each** page (Bunonika, then Vagyashreeshop). Copy both —
   you'll need them in step 3 below.

## 2. Deploy this code to Hostinger

1. Zip this whole folder (or push it to a GitHub repo — either works).
2. In Hostinger hPanel: **Websites → Add Website → Node.js Web App**.
3. Choose **Upload your website files** (or GitHub, if you used a repo).
4. Set the subdomain to `ai.bunonika.com` (add it as a subdomain of
   bunonika.com first if you haven't already, under Domains).
5. Set the **Startup file** to `server.js`.
6. Hostinger will detect this as an "Express" app automatically.

## 3. Set environment variables

In the Node.js app's settings in hPanel, there's an **Environment Variables**
section. Add each value from `.env.example`:

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `META_VERIFY_TOKEN` | Make up any random string yourself |
| `BUNONIKA_PAGE_ACCESS_TOKEN` | From Meta App step 1.4 |
| `BUNONIKA_WC_CONSUMER_KEY` / `SECRET` | Already generated — see `.env.example` |
| `VAGYASHREESHOP_PAGE_ACCESS_TOKEN` | From Meta App step 1.4 |

Click **Restart App** after saving.

## 4. Connect the webhook in Meta

1. Back in the Meta App dashboard → Messenger → Settings → **Webhooks**.
2. Callback URL: `https://ai.bunonika.com/webhook`
3. Verify Token: the exact same string you set as `META_VERIFY_TOKEN`.
4. Subscribe to the `messages` field.
5. Under "Webhooks", subscribe **both** pages (Bunonika and Vagyashreeshop)
   to this webhook.

## 5. Test it

Send a message to the Bunonika Facebook Page from a personal account (not
the Page's own account) and you should get an AI reply within a few seconds.
Try asking about a product (e.g. "hoodie ache?") — it should look up real
stock from bunonika.com.

Check the app's logs in Hostinger's Node.js panel if something doesn't reply —
errors are printed there.

## Notes / limitations of this Phase 1 version

- Conversation memory is in-server-memory only — it resets if the app
  restarts. Fine for now; move to a real database later if needed.
- "Human handoff" just sends an acknowledgement message and prints a log
  line — it does not yet notify you by SMS/email. Easy to add later
  (e.g. send yourself a Messenger/WhatsApp alert) once you know how you
  want to be notified.
- Vagyashreeshop has no real stock lookup yet since it has no website.
  Update `businessInfo` in `config/pages.js` with real details (or connect
  a store later) to get better answers.
- To add a third page later, add one more object to `config/pages.js` and
  one more Page Access Token — no other code changes needed.
