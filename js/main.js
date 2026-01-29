"use strict";

//product data
const PRODUCTS = [
  {
    id: "bamboo-toothbrush",
    name: "Bamboo Toothbrush (Pack of 4)",
    priceNow: 399,
    priceWas: 550,
    short: "Plant-based bristles + biodegradable bamboo handle.",
    tags: ["Plastic-free", "Bathroom"],
    image: "../images/product_bamboo_toothbrush.jpg",
  },
  {
    id: "reusable-bottle",
    name: "Insulated Reusable Bottle (750ml)",
    priceNow: 1299,
    priceWas: 1599,
    short: "Keeps drinks cold for 24h and hot for 12h.",
    tags: ["Reusable", "Travel"],
    image: "../images/product_reusable_bottle.jpg",
  },
  {
    id: "compostable-sponges",
    name: "Compostable Kitchen Sponges",
    priceNow: 499,
    priceWas: 650,
    short: "Cellulose + coconut fiber—home-compostable.",
    tags: ["Kitchen", "Low-waste"],
    image: "../images/product_sponges.jpg",
  },
];

//helper functions
function formatNPR(amount) {
  return "NPR " + Number(amount).toLocaleString("en-US");
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

//navbar active link
function highlightActiveNav() {
  const currentPage = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  $all("nav a[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    }
  });
}

//cart-demo
const CART_KEY = "gl_cart_count";

function getCartCount() {
  const saved = localStorage.getItem(CART_KEY);
  return saved === null ? 0 : Number(saved);
}

function setCartCount(count) {
  localStorage.setItem(CART_KEY, String(count));
  const badge = $("#cartCount");
  if (badge) badge.textContent = String(count);
  // updates quick stats count
  const kpi = document.getElementById("kpi2");
  if (kpi) kpi.textContent = String(count);
}

//reset button function
function setupResetCartButton() {
  const resetBtn = document.getElementById("resetCartBtn");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    setCartCount(0);
    showToast("🗑️ Cart has been reset");
  });
}

/* ---------- Toast / Alert Slider ---------- */
let toastTimer = null;

function showToast(message, type) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  // If the toast HTML is missing on this page, do nothing
  if (!toast || !toastMsg) return;

  toast.classList.remove("success");
  if (type === "success") toast.classList.add("success");

  toastMsg.textContent = message;
  // show (CSS class makes it slide in)
  toast.classList.add("show");

  // auto-hide after 1.8 seconds
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}
/* ---------- Theme Toggle ---------- */
function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // Persist user preference
  const saved = localStorage.getItem("gl_theme");
  if (saved === "dark") document.body.classList.add("dark");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("gl_theme", isDark ? "dark" : "light");
    btn.setAttribute("aria-pressed", String(isDark));
  });
}

/* ---------- Cart Functions ---------- */
function setupCartButtons() {
  // showing current cart count on page load
  setCartCount(getCartCount());

  $all("[data-add-to-cart]").forEach((button) => {
    const originalText = button.textContent; // safer than hard-coding "Add to Cart"

    button.addEventListener("click", () => {
      const newCount = getCartCount() + 1;
      setCartCount(newCount);

      showToast("✅ Added to cart successfully!", "success");
      // visual feedback
      button.textContent = "Added ✓";
      setTimeout(() => {
        button.textContent = originalText;
      }, 900);
    });
  });
}

//inject to products if #featuredProducts exists
function renderFeaturedProducts() {
  const mount = $("#featuredProducts");
  if (!mount) return; // Not the Home page (or container removed)

  const featured = PRODUCTS.slice(0, 3);

  mount.innerHTML = featured
    .map((p) => {
      const save = p.priceWas - p.priceNow;

      return `
        <article class="card product reveal">
          <img src="${p.image}" alt="${p.name}">
          <div class="chip" aria-label="Tags">${p.tags.join(" • ")}</div>

          <h3>${p.name}</h3>

          <div class="price-row">
            <span class="price-now">${formatNPR(p.priceNow)}</span>
            <span class="price-was">${formatNPR(p.priceWas)}</span>
            <span class="muted">(Save ${formatNPR(save)})</span>
          </div>

          <p class="muted">${p.short}</p>

          <div class="product-actions">
            <button class="btn primary" data-add-to-cart="true" type="button">Add to Cart</button>
            <a class="btn" href="products.html#${p.id}">View</a>
          </div>
        </article>
      `;
    })
    .join("");
}

//start-ups
document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  renderFeaturedProducts();
  setupCartButtons();
  setupResetCartButton();
  setupThemeToggle();
});
