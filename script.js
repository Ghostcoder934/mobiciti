
// MOBICITI LANGUAGE SYSTEM

const languageButton = document.getElementById("language");
let currentLanguage = "es";

function changeLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es";

  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-es][data-en]").forEach(element => {
    element.textContent = element.getAttribute(`data-${currentLanguage}`);
  });

  if (languageButton) {
    languageButton.textContent = currentLanguage === "es" ? "EN" : "ES";
  }
}

if (languageButton) {
  languageButton.addEventListener("click", changeLanguage);
}

// MOBICITI SHOPPING CART

let cart = {};

const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const checkout = document.getElementById("checkout");

// Update cart display
function updateCart() {
  if (!cartItems || !cartCount) return;

  cartItems.innerHTML = "";
  let totalItems = 0;

  Object.entries(cart).forEach(([product, quantity]) => {
    totalItems += quantity;

    const item = document.createElement("div");
    item.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = `${product} × ${quantity}`;

    const remove = document.createElement("button");
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      delete cart[product];
      updateCart();
    });

    item.append(name, remove);
    cartItems.appendChild(item);
  });

  if (totalItems === 0) {
    cartItems.textContent = "Your cart is empty.";
  }

  cartCount.textContent = totalItems;
}

// Add products using event delegation
document.addEventListener("click", event => {
  const button = event.target.closest(".add-to-cart");

  if (!button) return;

  const product = button.dataset.product;

  if (!product) return;

  cart[product] = (cart[product] || 0) + 1;

  updateCart();

  if (cartPanel) {
    cartPanel.classList.add("active");
  }

  const originalText = button.textContent;
  button.textContent = "Added!";

  setTimeout(() => {
    button.textContent = originalText;
  }, 1200);
});

// Open cart
if (cartToggle && cartPanel) {
  cartToggle.addEventListener("click", () => {
    cartPanel.classList.add("active");
  });
}

// Close cart
if (cartClose && cartPanel) {
  cartClose.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });
}

// WhatsApp ordering
if (checkout) {
  checkout.addEventListener("click", () => {
    const products = Object.entries(cart);

    if (products.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = products
      .map(([name, quantity]) => `${name} x ${quantity}`)
      .join("\n");

    const message =
      "Hello Mobiciti! I would like to enquire about these products:\n\n" +
      order;

    const url =
      "https://wa.me/34930385556?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");
  });
}

updateCart();
// PRODUCT CATEGORY FILTERS
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach(card => {
      const category = card.dataset.category;

      card.style.display =
        selectedFilter === "all" || category === selectedFilter
          ? ""
          : "none";
    });
  });
});
// PRODUCT SEARCH
const searchInput = document.getElementById("product-search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    productCards.forEach(card => {
      const productName = card.textContent.toLowerCase();
      const matchesSearch = productName.includes(searchTerm);
      const selectedFilter = document.querySelector(".filter-btn.active")?.dataset.filter;
      const matchesFilter =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.style.display =
        matchesSearch && matchesFilter ? "" : "none";
    });
  });
}