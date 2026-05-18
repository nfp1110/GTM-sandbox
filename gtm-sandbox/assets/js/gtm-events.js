/* =========================================================
   GTM EVENTS — GA4 Ecommerce dataLayer helpers
   All standard GA4 ecommerce events:
   view_item_list, select_item, view_item, add_to_cart,
   remove_from_cart, view_cart, begin_checkout,
   add_shipping_info, add_payment_info, purchase
   Plus: generic_event, form_submit, newsletter_signup
   ========================================================= */

window.dataLayer = window.dataLayer || [];

const GTM = {
  push(event, payload = {}) {
    const data = { event, ...payload };
    window.dataLayer.push(data);
    if (window.LOWEND_DEBUG) console.log('[dataLayer]', data);
    return data;
  },

  // Always clear the previous ecommerce object before pushing a new one
  // (GA4 best practice to avoid event "spillover")
  pushEcommerce(event, ecommerce) {
    window.dataLayer.push({ ecommerce: null });
    return this.push(event, { ecommerce });
  },

  // -------- helpers to build the item payload --------
  buildItem(product, quantity = 1) {
    return {
      item_id: product.sku,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category,
      item_variant: product.variant || undefined,
      price: product.price,
      quantity: quantity,
    };
  },

  buildItems(cartItems) {
    return cartItems.map(ci => this.buildItem(ci, ci.quantity));
  },

  // -------- GA4 ecommerce events --------
  viewItemList(products, listName = 'all_products') {
    this.pushEcommerce('view_item_list', {
      item_list_name: listName,
      items: products.map(p => this.buildItem(p, 1)),
    });
  },

  selectItem(product, listName = 'all_products') {
    this.pushEcommerce('select_item', {
      item_list_name: listName,
      items: [this.buildItem(product, 1)],
    });
  },

  viewItem(product) {
    this.pushEcommerce('view_item', {
      currency: 'AUD',
      value: product.price,
      items: [this.buildItem(product, 1)],
    });
  },

  addToCart(product, quantity = 1) {
    this.pushEcommerce('add_to_cart', {
      currency: 'AUD',
      value: product.price * quantity,
      items: [this.buildItem(product, quantity)],
    });
  },

  removeFromCart(product, quantity = 1) {
    this.pushEcommerce('remove_from_cart', {
      currency: 'AUD',
      value: product.price * quantity,
      items: [this.buildItem(product, quantity)],
    });
  },

  viewCart(cartItems, total) {
    this.pushEcommerce('view_cart', {
      currency: 'AUD',
      value: total,
      items: this.buildItems(cartItems),
    });
  },

  beginCheckout(cartItems, total) {
    this.pushEcommerce('begin_checkout', {
      currency: 'AUD',
      value: total,
      items: this.buildItems(cartItems),
    });
  },

  addShippingInfo(cartItems, total, shippingTier = 'standard') {
    this.pushEcommerce('add_shipping_info', {
      currency: 'AUD',
      value: total,
      shipping_tier: shippingTier,
      items: this.buildItems(cartItems),
    });
  },

  addPaymentInfo(cartItems, total, paymentType) {
    this.pushEcommerce('add_payment_info', {
      currency: 'AUD',
      value: total,
      payment_type: paymentType,
      items: this.buildItems(cartItems),
    });
  },

  purchase(orderId, cartItems, total, tax, shipping, coupon) {
    this.pushEcommerce('purchase', {
      transaction_id: orderId,
      currency: 'AUD',
      value: total,
      tax: tax,
      shipping: shipping,
      coupon: coupon || undefined,
      items: this.buildItems(cartItems),
    });
  },

  // -------- generic events --------
  formSubmit(formName, extra = {}) {
    this.push('form_submit', { form_name: formName, ...extra });
  },

  newsletterSignup(email) {
    this.push('newsletter_signup', {
      method: 'footer_form',
      // Note: in production you'd hash the email server-side, this is a sandbox
      user_email_domain: (email || '').split('@')[1] || 'unknown',
    });
  },

  // Custom generic event helper — your team can call this from the console
  // to test new tags without writing code: GTM.push('my_custom_event', {...})
};

// Expose globally for console testing
window.GTM = GTM;

// Friendly console banner so the team knows what's going on
console.log(
  '%c LOWEND AUDIO — GTM Sandbox ',
  'background:#1a1a1a;color:#c8511a;font-weight:bold;padding:4px 8px;'
);
console.log(
  '%c Try: GTM.push("my_event", { key: "value" })\n' +
  ' Or:  window.dataLayer  to inspect',
  'color:#888;font-family:monospace;'
);
