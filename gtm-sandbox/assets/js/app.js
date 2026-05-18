/* =========================================================
   LOWEND AUDIO — App logic
   - Product catalog (in-memory)
   - Cart state in localStorage
   - Page-specific initializers
   - SVG product illustrations (inline for portability)
   ========================================================= */

// ----- PRODUCT CATALOG -----
const PRODUCTS = [
  {
    sku: 'BASS-PB-001',
    name: 'Mariner P-Bass Standard',
    brand: 'Driftwood',
    category: 'bass',
    variant: 'Sunburst / Rosewood',
    price: 1299.00,
    description: 'A no-nonsense passive precision bass with a split-coil pickup, vintage-radius neck, and bone nut. Built for thump.',
    badge: 'NEW',
  },
  {
    sku: 'BASS-JB-002',
    name: 'Coastline Jazz Deluxe',
    brand: 'Driftwood',
    category: 'bass',
    variant: 'Olympic White / Maple',
    price: 1799.00,
    description: 'Twin single-coil pickups, slim-taper neck, active EQ optional. The sound of a thousand records.',
  },
  {
    sku: 'BASS-SR-003',
    name: 'Soundpost 5-String',
    brand: 'Aerolite',
    category: 'bass',
    variant: 'Trans Black / Ebony',
    price: 2199.00,
    description: 'Five-string ergonomic body, neodymium pickups, 18V active circuit. For players who like real estate.',
  },
  {
    sku: 'AMP-TUBE-010',
    name: 'Heritage 50 Tube Head',
    brand: 'Stoneham',
    category: 'amps',
    variant: '50W / All-tube',
    price: 1499.00,
    description: 'Hand-wired 50-watt all-tube head. Three-band EQ, footswitchable boost, master volume.',
    badge: 'STAFF PICK',
  },
  {
    sku: 'AMP-COMBO-011',
    name: 'Lowtide 1×12 Combo',
    brand: 'Stoneham',
    category: 'amps',
    variant: '40W / Solid-state',
    price: 649.00,
    description: 'Practice-room workhorse with onboard reverb, headphone out, and an aux-in for jam tracks.',
  },
  {
    sku: 'PED-COMP-020',
    name: 'Field Compressor',
    brand: 'Northshore',
    category: 'pedals',
    variant: 'Standard',
    price: 219.00,
    description: 'Optical compressor with sidechain blend. Squashes peaks without flattening the life out of your tone.',
  },
  {
    sku: 'PED-OD-021',
    name: 'Smoke Drive Overdrive',
    brand: 'Northshore',
    category: 'pedals',
    variant: 'Standard',
    price: 189.00,
    description: 'Class-A discrete overdrive with a clean blend. From hair to full grit, without losing the low end.',
  },
  {
    sku: 'ACC-STR-030',
    name: 'Roundwound Bass Strings',
    brand: 'Linehouse',
    category: 'accessories',
    variant: '45-105 Nickel',
    price: 32.00,
    description: 'Long-scale nickel-plated roundwounds. Bright, balanced, and built to outlast your last gig bag.',
  },
  {
    sku: 'ACC-CAB-031',
    name: 'Studio Instrument Cable',
    brand: 'Linehouse',
    category: 'accessories',
    variant: '10 ft / Right-angle',
    price: 48.00,
    description: 'Low-capacitance instrument cable with gold-plated connectors. Lifetime warranty.',
  },
];

// ----- SVG PRODUCT ILLUSTRATIONS -----
// Simple line-art SVGs so the site looks real without needing image files
const SVG = {
  bass: `<svg viewBox="0 0 200 400" fill="none" stroke="#1a1a1a" stroke-width="1.5">
    <!-- body -->
    <path d="M50 280 Q40 320, 60 350 Q90 380, 100 370 Q110 380, 140 350 Q160 320, 150 280 Q145 250, 130 240 L100 235 L70 240 Q55 250, 50 280 Z" fill="#c8511a" fill-opacity="0.85" stroke="#1a1a1a"/>
    <!-- neck -->
    <rect x="93" y="60" width="14" height="180" fill="#3a2a1a" stroke="#1a1a1a"/>
    <!-- headstock -->
    <path d="M85 30 L115 30 L118 60 L82 60 Z" fill="#3a2a1a" stroke="#1a1a1a"/>
    <!-- tuners -->
    <circle cx="86" cy="40" r="2.5" fill="#1a1a1a"/>
    <circle cx="114" cy="40" r="2.5" fill="#1a1a1a"/>
    <circle cx="86" cy="50" r="2.5" fill="#1a1a1a"/>
    <circle cx="114" cy="50" r="2.5" fill="#1a1a1a"/>
    <!-- pickup -->
    <rect x="85" y="290" width="30" height="14" fill="#1a1a1a"/>
    <!-- bridge -->
    <rect x="88" y="340" width="24" height="8" fill="#1a1a1a"/>
    <!-- strings -->
    <line x1="96" y1="60" x2="96" y2="345" stroke="#888" stroke-width="0.4"/>
    <line x1="99" y1="60" x2="99" y2="345" stroke="#888" stroke-width="0.4"/>
    <line x1="102" y1="60" x2="102" y2="345" stroke="#888" stroke-width="0.4"/>
    <line x1="105" y1="60" x2="105" y2="345" stroke="#888" stroke-width="0.4"/>
    <!-- knobs -->
    <circle cx="135" cy="320" r="4" fill="#1a1a1a"/>
    <circle cx="145" cy="335" r="4" fill="#1a1a1a"/>
  </svg>`,

  amps: `<svg viewBox="0 0 240 200" fill="none" stroke="#1a1a1a" stroke-width="1.5">
    <!-- cabinet -->
    <rect x="20" y="30" width="200" height="140" fill="#2a2520" stroke="#1a1a1a"/>
    <!-- grille -->
    <rect x="35" y="60" width="170" height="95" fill="#1a1a1a"/>
    <pattern id="grille" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="0.6" fill="#666"/>
    </pattern>
    <rect x="35" y="60" width="170" height="95" fill="url(#grille)"/>
    <!-- top panel -->
    <rect x="20" y="30" width="200" height="22" fill="#c8511a"/>
    <!-- knobs on top -->
    <circle cx="50" cy="41" r="4" fill="#1a1a1a"/>
    <circle cx="75" cy="41" r="4" fill="#1a1a1a"/>
    <circle cx="100" cy="41" r="4" fill="#1a1a1a"/>
    <circle cx="125" cy="41" r="4" fill="#1a1a1a"/>
    <circle cx="150" cy="41" r="4" fill="#1a1a1a"/>
    <!-- logo plate -->
    <rect x="170" y="36" width="40" height="10" fill="#f4f0e8"/>
    <!-- corners -->
    <circle cx="28" cy="38" r="3" fill="#888"/>
    <circle cx="212" cy="38" r="3" fill="#888"/>
    <circle cx="28" cy="162" r="3" fill="#888"/>
    <circle cx="212" cy="162" r="3" fill="#888"/>
  </svg>`,

  pedals: `<svg viewBox="0 0 200 220" fill="none" stroke="#1a1a1a" stroke-width="1.5">
    <!-- enclosure -->
    <rect x="30" y="20" width="140" height="180" rx="4" fill="#c8511a" stroke="#1a1a1a"/>
    <!-- footswitch -->
    <circle cx="100" cy="165" r="14" fill="#1a1a1a"/>
    <circle cx="100" cy="165" r="6" fill="#888"/>
    <!-- knobs -->
    <circle cx="70" cy="60" r="14" fill="#f4f0e8" stroke="#1a1a1a"/>
    <line x1="70" y1="50" x2="70" y2="56" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="130" cy="60" r="14" fill="#f4f0e8" stroke="#1a1a1a"/>
    <line x1="130" y1="50" x2="125" y2="56" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="70" cy="105" r="14" fill="#f4f0e8" stroke="#1a1a1a"/>
    <line x1="70" y1="95" x2="74" y2="100" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="130" cy="105" r="14" fill="#f4f0e8" stroke="#1a1a1a"/>
    <line x1="130" y1="95" x2="130" y2="101" stroke="#1a1a1a" stroke-width="2"/>
    <!-- LED -->
    <circle cx="100" cy="125" r="3" fill="#ff3300"/>
    <!-- jacks (sides) -->
    <rect x="20" y="65" width="12" height="14" fill="#1a1a1a"/>
    <rect x="168" y="65" width="12" height="14" fill="#1a1a1a"/>
  </svg>`,

  accessories: `<svg viewBox="0 0 200 200" fill="none" stroke="#1a1a1a" stroke-width="1.5">
    <!-- coiled cable -->
    <circle cx="100" cy="100" r="70" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="100" cy="100" r="55" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="100" cy="100" r="40" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="100" cy="100" r="25" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <!-- jack end -->
    <rect x="155" y="92" width="28" height="16" fill="#c8511a" stroke="#1a1a1a"/>
    <rect x="180" y="96" width="14" height="8" fill="#1a1a1a"/>
  </svg>`,
};

function productSvg(product) {
  return SVG[product.category] || SVG.accessories;
}

// ----- UTILITIES -----
const fmt = n => '$' + n.toFixed(2);

function getProductBySku(sku) {
  return PRODUCTS.find(p => p.sku === sku);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function flash(message) {
  const el = document.createElement('div');
  el.className = 'flash';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2400);
}

// ----- CART STATE -----
const CART_KEY = 'lowend_cart_v1';

const Cart = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (e) { return []; }
  },
  write(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this._updateBadge();
  },
  add(sku, quantity = 1) {
    const items = this.read();
    const existing = items.find(i => i.sku === sku);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const p = getProductBySku(sku);
      if (!p) return;
      items.push({ ...p, quantity });
    }
    this.write(items);
  },
  remove(sku) {
    this.write(this.read().filter(i => i.sku !== sku));
  },
  setQuantity(sku, qty) {
    const items = this.read();
    const item = items.find(i => i.sku === sku);
    if (!item) return;
    if (qty <= 0) {
      this.write(items.filter(i => i.sku !== sku));
    } else {
      item.quantity = qty;
      this.write(items);
    }
  },
  clear() {
    localStorage.removeItem(CART_KEY);
    this._updateBadge();
  },
  count() {
    return this.read().reduce((s, i) => s + i.quantity, 0);
  },
  subtotal() {
    return this.read().reduce((s, i) => s + i.price * i.quantity, 0);
  },
  _updateBadge() {
    const badge = document.querySelector('.cart-count');
    if (badge) {
      const c = this.count();
      badge.textContent = c;
      badge.setAttribute('data-count', c);
    }
  },
};

// ----- GTM STATUS BANNER -----
function updateGtmStatus() {
  const el = document.getElementById('gtm-status');
  if (!el) return;
  // Look for the meta tag we set in <head>
  const meta = document.querySelector('meta[name="gtm-container-id"]');
  const id = meta && meta.content;
  if (!id || id === 'GTM-XXXXXXX') {
    el.innerHTML = '⚠ GTM container ID is a placeholder. Edit <code>&lt;meta name="gtm-container-id"&gt;</code> in each HTML file. <a href="README.md" style="text-decoration:underline">Setup guide →</a>';
    el.classList.remove('ok');
  } else {
    el.innerHTML = `✓ GTM container <code>${id}</code> loaded. Open the GTM Preview Mode and connect to this URL to start testing.`;
    el.classList.add('ok');
  }
}

// ----- PAGE: HOME -----
function initHome() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 4);
  grid.innerHTML = featured.map(p => productCardHtml(p, 'featured')).join('');
  GTM.viewItemList(featured, 'featured_homepage');
  bindProductCardClicks(grid, 'featured_homepage');
}

// ----- PAGE: PRODUCT LIST -----
function initProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const filterBar = document.getElementById('filter-bar');
  let activeFilter = getQueryParam('category') || 'all';

  function render() {
    const visible = activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeFilter);
    grid.innerHTML = visible.map(p => productCardHtml(p, 'all_products')).join('');
    bindProductCardClicks(grid, `category_${activeFilter}`);
    GTM.viewItemList(visible, `category_${activeFilter}`);
  }

  if (filterBar) {
    filterBar.querySelectorAll('.filter-chip').forEach(chip => {
      const cat = chip.dataset.filter;
      if (cat === activeFilter) chip.classList.add('active');
      chip.addEventListener('click', () => {
        activeFilter = cat;
        filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        GTM.push('filter_select', { filter_category: cat });
        render();
      });
    });
  }
  render();
}

function productCardHtml(p, listName) {
  const badge = p.badge ? `<div class="badge">${p.badge}</div>` : '';
  return `
    <article class="product-card" data-sku="${p.sku}">
      <a href="product.html?sku=${p.sku}">
        <div class="product-card-img">
          ${badge}
          ${productSvg(p)}
        </div>
        <div class="product-card-cat">${p.brand} · ${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price">${fmt(p.price)}</div>
      </a>
    </article>
  `;
}

function bindProductCardClicks(container, listName) {
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const sku = card.dataset.sku;
      const product = getProductBySku(sku);
      if (product) GTM.selectItem(product, listName);
      // Let the link navigate normally
    });
  });
}

// ----- PAGE: PRODUCT DETAIL -----
function initProductDetail() {
  const root = document.getElementById('product-detail');
  if (!root) return;
  const sku = getQueryParam('sku');
  const product = getProductBySku(sku);
  if (!product) {
    root.innerHTML = '<p style="padding:80px 0;text-align:center;">Product not found. <a href="products.html" class="btn-text">Back to all products</a></p>';
    return;
  }

  document.title = `${product.name} — Lowend Audio`;
  root.innerHTML = `
    <div class="product-gallery">
      ${productSvg(product)}
    </div>
    <div class="product-info">
      <div class="breadcrumb">
        <a href="index.html">Home</a> /
        <a href="products.html?category=${product.category}">${product.category}</a> /
        <span>${product.name}</span>
      </div>
      <h1>${product.name}</h1>
      <div class="price-tag">${fmt(product.price)}</div>
      <p class="desc">${product.description}</p>
      <div class="qty-row">
        <div class="qty-control">
          <button id="qty-minus" aria-label="Decrease quantity">−</button>
          <input id="qty-input" type="text" value="1" readonly>
          <button id="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button id="add-to-cart" class="btn btn-primary">Add to cart</button>
      </div>
      <div class="product-meta">
        <div><strong>SKU:</strong> ${product.sku}</div>
        <div><strong>Brand:</strong> ${product.brand}</div>
        <div><strong>Variant:</strong> ${product.variant || '—'}</div>
        <div><strong>Ships:</strong> 2–4 business days, free over $200</div>
      </div>
    </div>
  `;

  GTM.viewItem(product);

  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
  document.getElementById('add-to-cart').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value);
    Cart.add(product.sku, qty);
    GTM.addToCart(product, qty);
    flash(`Added to cart: ${product.name}`);
  });
}

// ----- PAGE: CART -----
function initCart() {
  const root = document.getElementById('cart-root');
  if (!root) return;

  function render() {
    const items = Cart.read();
    if (items.length === 0) {
      root.innerHTML = `
        <div class="cart-empty">
          <h2>Your cart is empty.</h2>
          <p>You haven't added anything yet — but the rack is full.</p>
          <a href="products.html" class="btn btn-primary">Browse the shop</a>
        </div>
      `;
      return;
    }

    const subtotal = Cart.subtotal();
    const shipping = subtotal >= 200 ? 0 : 15;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    root.innerHTML = `
      <div class="cart-wrap">
        <div>
          <div class="section-head" style="margin-bottom:24px;">
            <div><h2>Your cart</h2></div>
            <div style="font-family:var(--mono);font-size:12px;color:var(--ink-faint);letter-spacing:.1em;text-transform:uppercase;">
              ${Cart.count()} item${Cart.count() === 1 ? '' : 's'}
            </div>
          </div>
          <div class="cart-items">
            ${items.map(i => `
              <div class="cart-item" data-sku="${i.sku}">
                <div class="cart-item-img">${productSvg(i)}</div>
                <div>
                  <h3>${i.name}</h3>
                  <div class="cat">${i.brand} · ${i.variant || ''}</div>
                  <button class="remove" data-action="remove" data-sku="${i.sku}">Remove</button>
                </div>
                <div class="qty-control">
                  <button data-action="dec" data-sku="${i.sku}">−</button>
                  <input type="text" value="${i.quantity}" readonly>
                  <button data-action="inc" data-sku="${i.sku}">+</button>
                </div>
                <div class="line-price">${fmt(i.price * i.quantity)}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <aside class="cart-summary">
          <h3>Order summary</h3>
          <div class="row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
          <div class="row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
          <div class="row"><span>Tax (GST 10%)</span><span>${fmt(tax)}</span></div>
          <div class="row total"><span>Total</span><span>${fmt(total)}</span></div>
          <a href="checkout.html" id="checkout-btn" class="btn btn-primary btn-block" style="margin-top:24px;">Checkout</a>
        </aside>
      </div>
    `;

    root.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sku = btn.dataset.sku;
        const action = btn.dataset.action;
        const item = Cart.read().find(i => i.sku === sku);
        if (!item) return;
        if (action === 'remove') {
          GTM.removeFromCart(item, item.quantity);
          Cart.remove(sku);
        } else if (action === 'inc') {
          Cart.setQuantity(sku, item.quantity + 1);
          GTM.addToCart(item, 1);
        } else if (action === 'dec') {
          Cart.setQuantity(sku, item.quantity - 1);
          GTM.removeFromCart(item, 1);
        }
        render();
      });
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        GTM.beginCheckout(Cart.read(), total);
        // Save totals so checkout page can show them
        sessionStorage.setItem('checkout_totals', JSON.stringify({ subtotal, shipping, tax, total }));
      });
    }
  }

  render();
  // Fire view_cart on page load
  const items = Cart.read();
  if (items.length > 0) {
    GTM.viewCart(items, Cart.subtotal());
  }
}

// ----- PAGE: CHECKOUT -----
function initCheckout() {
  const root = document.getElementById('checkout-root');
  if (!root) return;
  const items = Cart.read();

  if (items.length === 0) {
    root.innerHTML = `
      <div class="cart-empty">
        <h2>Nothing to check out.</h2>
        <p>Your cart is empty.</p>
        <a href="products.html" class="btn btn-primary">Browse the shop</a>
      </div>`;
    return;
  }

  const subtotal = Cart.subtotal();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;

  root.innerHTML = `
    <div class="checkout-wrap">
      <div>
        <h1 style="font-family:var(--serif);font-weight:300;font-size:42px;letter-spacing:-.025em;margin-bottom:32px;">Checkout</h1>

        <div class="form-section">
          <h3>Contact</h3>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required>
          </div>
        </div>

        <div class="form-section">
          <h3>Shipping address</h3>
          <div class="field-row">
            <div class="field">
              <label for="firstName">First name</label>
              <input type="text" id="firstName" name="firstName" required>
            </div>
            <div class="field">
              <label for="lastName">Last name</label>
              <input type="text" id="lastName" name="lastName" required>
            </div>
          </div>
          <div class="field">
            <label for="address">Address</label>
            <input type="text" id="address" name="address" required>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="city">City</label>
              <input type="text" id="city" name="city" required>
            </div>
            <div class="field">
              <label for="postcode">Postcode</label>
              <input type="text" id="postcode" name="postcode" required>
            </div>
          </div>
          <div class="field">
            <label for="country">Country</label>
            <select id="country" name="country">
              <option>Australia</option>
              <option>New Zealand</option>
              <option>United Kingdom</option>
              <option>United States</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3>Shipping method</h3>
          <div class="payment-options">
            <label><input type="radio" name="shipping" value="standard" checked> Standard · 3–5 days · ${shipping === 0 ? 'Free' : fmt(shipping)}</label>
            <label><input type="radio" name="shipping" value="express"> Express · 1–2 days · $25.00</label>
          </div>
        </div>

        <div class="form-section">
          <h3>Payment</h3>
          <div class="payment-options" id="payment-options">
            <label><input type="radio" name="payment" value="credit_card" checked> Credit card</label>
            <label><input type="radio" name="payment" value="paypal"> PayPal</label>
            <label><input type="radio" name="payment" value="afterpay"> Afterpay</label>
          </div>
        </div>

        <button id="place-order" class="btn btn-primary btn-block" style="margin-top:12px;">Place order — ${fmt(total)}</button>
      </div>

      <aside class="cart-summary">
        <h3>Order summary</h3>
        ${items.map(i => `
          <div class="row" style="align-items:flex-start;">
            <span style="max-width:60%;">${i.name}<br><span style="color:var(--ink-faint);font-size:11px;">Qty ${i.quantity}</span></span>
            <span>${fmt(i.price * i.quantity)}</span>
          </div>`).join('')}
        <div style="height:12px;border-bottom:1px solid var(--rule);margin-bottom:8px;"></div>
        <div class="row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        <div class="row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
        <div class="row"><span>Tax</span><span>${fmt(tax)}</span></div>
        <div class="row total"><span>Total</span><span>${fmt(total)}</span></div>
      </aside>
    </div>
  `;

  // Fire add_shipping_info when shipping method changes
  root.querySelectorAll('input[name="shipping"]').forEach(r => {
    r.addEventListener('change', e => {
      GTM.addShippingInfo(items, total, e.target.value);
    });
  });

  // Fire add_payment_info when payment method changes
  root.querySelectorAll('input[name="payment"]').forEach(r => {
    r.addEventListener('change', e => {
      GTM.addPaymentInfo(items, total, e.target.value);
    });
  });

  document.getElementById('place-order').addEventListener('click', () => {
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const shippingTier = document.querySelector('input[name="shipping"]:checked').value;
    // Fire add_payment_info on submit too (covers users who didn't change the default)
    GTM.addPaymentInfo(items, total, payment);

    const orderId = 'TEST-' + Math.floor(Math.random() * 9000000 + 1000000);
    GTM.purchase(orderId, items, total, tax, shipping, null);

    sessionStorage.setItem('last_order', JSON.stringify({
      orderId, items, subtotal, shipping, tax, total, payment, shippingTier,
    }));
    Cart.clear();
    window.location.href = 'success.html';
  });
}

// ----- PAGE: SUCCESS -----
function initSuccess() {
  const root = document.getElementById('success-root');
  if (!root) return;
  const order = JSON.parse(sessionStorage.getItem('last_order') || 'null');
  if (!order) {
    root.innerHTML = '<div class="success-wrap"><h1>No recent order found.</h1><p>Place an order to see this page.</p><a href="products.html" class="btn btn-primary">Browse the shop</a></div>';
    return;
  }
  root.innerHTML = `
    <div class="success-wrap">
      <div class="success-check">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="eyebrow">Order confirmed</div>
      <h1>Thank you<br>for your order.</h1>
      <p>A receipt has been sent to your email. Your gear ships in 2–4 business days.</p>
      <div class="order-detail">
        <div class="row"><span>Order number</span><span>${order.orderId}</span></div>
        <div class="row"><span>Items</span><span>${order.items.reduce((s, i) => s + i.quantity, 0)}</span></div>
        <div class="row"><span>Subtotal</span><span>${fmt(order.subtotal)}</span></div>
        <div class="row"><span>Shipping</span><span>${order.shipping === 0 ? 'Free' : fmt(order.shipping)}</span></div>
        <div class="row"><span>Tax</span><span>${fmt(order.tax)}</span></div>
        <div class="row" style="border-top:1px solid var(--rule);padding-top:8px;margin-top:8px;font-weight:500;">
          <span>Total</span><span>${fmt(order.total)}</span>
        </div>
      </div>
      <a href="index.html" class="btn btn-outline">Back to home</a>
    </div>
  `;
}

// ----- NEWSLETTER FORM (footer) -----
function initNewsletter() {
  document.querySelectorAll('.footer-newsletter form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();
      if (!email) return;
      GTM.newsletterSignup(email);
      GTM.formSubmit('newsletter_footer', { email_domain: email.split('@')[1] });
      input.value = '';
      flash('Subscribed to the newsletter.');
    });
  });
}

// ----- SCROLL DEPTH (generic event for testing scroll triggers) -----
function initScrollDepth() {
  const fired = new Set();
  const thresholds = [25, 50, 75, 90];
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.round((window.scrollY / max) * 100);
    thresholds.forEach(t => {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        GTM.push('scroll_depth', { percent_scrolled: t });
      }
    });
  }, { passive: true });
}

// ----- BOOT -----
document.addEventListener('DOMContentLoaded', () => {
  Cart._updateBadge();
  updateGtmStatus();
  initHome();
  initProducts();
  initProductDetail();
  initCart();
  initCheckout();
  initSuccess();
  initNewsletter();
  initScrollDepth();
});
