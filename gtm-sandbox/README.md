# Lowend Audio — GTM Sandbox

A fake ecommerce site for testing Google Tag Manager containers. Built as plain HTML/CSS/JS — no build step, no dependencies. Drop it on GitHub Pages and you're live.

---

## What's included

Six pages wired up with the full GA4 ecommerce event flow:

| Page | URL | Events fired |
|---|---|---|
| Home | `index.html` | `view_item_list` (featured) |
| Shop | `products.html` | `view_item_list`, `filter_select`, `select_item` |
| Product detail | `product.html?sku=BASS-PB-001` | `view_item`, `add_to_cart` |
| Cart | `cart.html` | `view_cart`, `add_to_cart`, `remove_from_cart`, `begin_checkout` |
| Checkout | `checkout.html` | `add_shipping_info`, `add_payment_info`, `purchase` |
| Success | `success.html` | (purchase fires before redirect) |

Plus on every page: `newsletter_signup`, `form_submit`, and `scroll_depth` (25/50/75/90%).

---

## 1. Deploy to GitHub Pages

```bash
# Create a new public repo on github.com, then:
git init
git add .
git commit -m "GTM sandbox"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gtm-sandbox.git
git push -u origin main
```

Then in the repo on GitHub:

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `/ (root)`
4. Save. Wait ~60 seconds.

Your site will be live at `https://YOUR-USERNAME.github.io/gtm-sandbox/`.

---

## 2. Add your GTM container ID

Open each HTML file (`index.html`, `products.html`, `product.html`, `cart.html`, `checkout.html`, `success.html`) and find/replace **`GTM-XXXXXXX`** with your container ID (e.g. `GTM-ABC1234`).

It appears in 3 places per file:
- The `<meta name="gtm-container-id">` tag (used for the status banner)
- The GTM `<script>` snippet in `<head>`
- The `<noscript>` iframe at the top of `<body>`

Quick way to do it from the command line:

```bash
# macOS / Linux
find . -name "*.html" -exec sed -i '' 's/GTM-XXXXXXX/GTM-YOUR-ID/g' {} +

# Linux (non-Mac)
find . -name "*.html" -exec sed -i 's/GTM-XXXXXXX/GTM-YOUR-ID/g' {} +
```

Commit and push. The yellow banner at the top of the site will turn green when the ID is configured correctly.

---

## 3. Connect GTM Preview Mode

1. In GTM, click **Preview** (top right)
2. Enter your site URL: `https://YOUR-USERNAME.github.io/gtm-sandbox/`
3. Click **Connect** — Tag Assistant opens in a new tab
4. Start clicking around the sandbox. Every event will appear in the Tag Assistant timeline.

---

## 4. Use GTM Environments for multi-user testing

So your team can test without overwriting each other's work:

1. **Admin → Environments → New**
2. Create environments like `dev`, `qa`, `staging`
3. Each gets a unique container snippet under **Actions → Get Snippet**
4. Either:
   - Deploy separate copies of the sandbox per environment, OR
   - Share the **Preview link** for any environment (testers don't need a separate snippet — they just visit the preview link from your live sandbox)

---

## 5. Testing tips

### Inspect the dataLayer directly

Open DevTools → Console:

```js
window.dataLayer            // see every event fired this session
GTM.push('my_event', {a:1}) // fire a custom event manually
window.LOWEND_DEBUG = true  // log every dataLayer push to the console
```

### Trigger every event

A full event flow run:

1. Land on home → fires `view_item_list`
2. Click Shop → fires `view_item_list`, click filter → fires `filter_select`
3. Click a product → fires `select_item`, then `view_item` on the detail page
4. Click "Add to cart" → fires `add_to_cart`
5. Go to cart → fires `view_cart`
6. Click checkout → fires `begin_checkout`
7. Change shipping method → fires `add_shipping_info`
8. Change payment method → fires `add_payment_info`
9. Place order → fires `add_payment_info` (again, safety net) + `purchase`

### Cart state

Cart is stored in `localStorage` under `lowend_cart_v1`. Clear it with:

```js
localStorage.removeItem('lowend_cart_v1')
```

### Customising products

Edit `assets/js/app.js` — the `PRODUCTS` array at the top is the entire catalog. Add, remove, or change items; the rest of the site picks them up automatically.

---

## File structure

```
gtm-sandbox/
├── index.html
├── products.html
├── product.html
├── cart.html
├── checkout.html
├── success.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── gtm-events.js   # dataLayer helpers (GA4 ecommerce)
        └── app.js          # catalog, cart, page logic
```

---

## Notes

- **Currency is AUD** in the dataLayer pushes. Change in `assets/js/gtm-events.js` if you want USD/GBP/etc.
- **No real payments happen.** Clicking "Place order" just fires the `purchase` event and redirects to the success page.
- **Mobile-responsive**, works on any device.
- **No tracking cookies set by the site itself** — anything that fires comes from your GTM container.
