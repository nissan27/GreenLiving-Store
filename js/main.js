'use strict';

/* ---------- Data Model for Products (used across pages) ---------- */
const PRODUCTS = [
  {
    id: 'bamboo-toothbrush',
    name: 'Bamboo Toothbrush (Pack of 4)',
    priceNow: 399,
    priceWas: 550,
    short: 'Plant-based bristles + biodegradable bamboo handle.',
    tags: ['Plastic-free', 'Bathroom'],
    image: '../images/product_bamboo_toothbrush.jpg'
  },
  {
    id: 'reusable-bottle',
    name: 'Insulated Reusable Bottle (750ml)',
    priceNow: 1299,
    priceWas: 1599,
    short: 'Keeps drinks cold for 24h and hot for 12h.',
    tags: ['Reusable', 'Travel'],
    image: '../images/product_reusable_bottle.jpg'
  },
  {
    id: 'compostable-sponges',
    name: 'Compostable Kitchen Sponges',
    priceNow: 499,
    priceWas: 650,
    short: 'Cellulose + coconut fiber—home-compostable.',
    tags: ['Kitchen', 'Low-waste'],
    image: '../images/product_sponges.jpg'
  },
  {
    id: 'cotton-tote',
    name: 'Organic Cotton Tote Bag',
    priceNow: 299,
    priceWas: 399,
    short: 'Durable daily carry with reinforced stitching.',
    tags: ['Reusable', 'Grocery'],
    image: '../images/product_tote.jpg'
  },
  {
    id: 'solar-lamp',
    name: 'Mini Solar Desk Lamp',
    priceNow: 1899,
    priceWas: 2299,
    short: 'USB + solar charging for power outages and study.',
    tags: ['Energy', 'Home'],
    image: '../images/product_solar_lamp.jpg'
  },
  {
    id: 'beeswax-wraps',
    name: 'Beeswax Food Wraps (Set of 3)',
    priceNow: 699,
    priceWas: 899,
    short: 'A natural alternative to single-use cling film.',
    tags: ['Kitchen', 'Reusable'],
    image: '../images/product_beeswax.jpg'
  }
];

/* ---------- Format money (NPR) ---------- */
function formatNPR(amount) {
  //  simple for understanding: NPR 1,299
  return 'NPR ' + Number(amount).toLocaleString('en-US');
}

/* ---------- Theme Toggle ---------- */
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Persist user preference
  const saved = localStorage.getItem('gl_theme');
  if (saved === 'dark') document.body.classList.add('dark');

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('gl_theme', isDark ? 'dark' : 'light');
    btn.setAttribute('aria-pressed', String(isDark));
  });
}

/* ---------- Cart Counter Demo ---------- */
function getCartCount() {
  return Number(localStorage.getItem('gl_cart_count') || '0');
}
function setCartCount(count) {
  localStorage.setItem('gl_cart_count', String(count));
  const el = document.getElementById('cartCount');
  if (el) el.textContent = String(count);
}
function setupCart() {
  // Initialize badge on every page
  setCartCount(getCartCount());

  // Attach add-to-cart buttons if they exist on the page
  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = getCartCount();
      setCartCount(current + 1);
      btn.textContent = 'Added ✓';
      setTimeout(() => (btn.textContent = 'Add to Cart'), 900);
    });
  });
}

/* ---------- Home Page: Featured Products Injection ---------- */
function renderFeaturedProducts() {
  const mount = document.getElementById('featuredProducts');
  if (!mount) return; // only on Home

  // Picking 3 products for the home page 
  const featured = PRODUCTS.slice(0, 3);

  const html = featured.map(p => `
    <article class="card product">
      <img src="${p.image}" alt="${p.name}">
      <div class="chip" aria-label="Tags">${p.tags.join(' • ')}</div>
      <h3>${p.name}</h3>
      <div class="price-row">
        <span class="price-now">${formatNPR(p.priceNow)}</span>
        <span class="price-was">${formatNPR(p.priceWas)}</span>
        <span class="muted">(Save ${formatNPR(p.priceWas - p.priceNow)})</span>
      </div>
      <p class="muted">${p.short}</p>
      <div class="product-actions">
        <button class="btn primary" data-add-to-cart="true">Add to Cart</button>
        <a class="btn" href="products.html#${p.id}">View</a>
      </div>
    </article>
  `).join('');

  mount.innerHTML = html;
}

/* ---------- Active Link Highlight ---------- */
function markActiveNav() {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === path) a.classList.add('active');
  });
}

/* ---------- Run on page load ---------- */
document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  setupThemeToggle();
  setupCart();
  renderFeaturedProducts();
});
