
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        emoji: "🎧",
        description: "Enjoy music with clear, immersive sound.",
        tags: ["audio", "music", "wireless"]
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        emoji: "⌚",
        description: "A smart companion for your daily routine.",
        tags: ["watch", "fitness", "technology"]
    },
    {
        id: 3,
        name: "Casual Sneakers",
        category: "Fashion",
        price: 1799,
        emoji: "👟",
        description: "Comfortable shoes for everyday wear.",
        tags: ["shoes", "footwear", "style"]
    },
    {
        id: 4,
        name: "Classic Backpack",
        category: "Fashion",
        price: 999,
        emoji: "🎒",
        description: "Carry your essentials wherever you go.",
        tags: ["bag", "travel", "school"]
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "Home",
        price: 1899,
        emoji: "☕",
        description: "Make your favourite coffee at home.",
        tags: ["coffee", "kitchen", "appliance"]
    },
    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 699,
        emoji: "💡",
        description: "Brighten your study or work space.",
        tags: ["light", "study", "desk"]
    },
    {
        id: 7,
        name: "Sunglasses",
        category: "Accessories",
        price: 799,
        emoji: "🕶️",
        description: "Add a stylish touch to your outfit.",
        tags: ["fashion", "eyewear", "style"]
    },
    {
        id: 8,
        name: "Wrist Bracelet",
        category: "Accessories",
        price: 499,
        emoji: "📿",
        description: "A simple accessory for everyday style.",
        tags: ["jewellery", "gift", "accessory"]
    }
];

const DELIVERY_CHARGE = 99;
const FREE_DELIVERY_LIMIT = 2000;
const MAX_RECENT_ITEMS = 5;

// Load saved data from the browser.
function loadSavedData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        return fallback;
    }
}

let cart = loadSavedData("cartifyCart", []);
let recentlyViewed = loadSavedData("cartifyRecent", []);
let selectedCategory = "All";

// Keep only valid cart items.
cart = Array.isArray(cart)
    ? cart.filter(item =>
        products.some(product => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    )
    : [];

recentlyViewed = Array.isArray(recentlyViewed)
    ? recentlyViewed.filter(id =>
        products.some(product => product.id === id)
    )
    : [];

// Save data in the browser.
function saveData() {
    try {
        localStorage.setItem("cartifyCart", JSON.stringify(cart));
        localStorage.setItem(
            "cartifyRecent",
            JSON.stringify(recentlyViewed)
        );
    } catch (error) {
        console.warn("Browser storage is unavailable.");
    }
}

// Format amounts in Indian Rupees.
function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Display a temporary message.
let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// Record a product in recently viewed history.
function recordRecentlyViewed(productId) {
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    recentlyViewed = recentlyViewed.slice(0, MAX_RECENT_ITEMS);

    saveData();
    renderRecentlyViewed();
}

// Display products and apply search/category filters.
function renderProducts() {
    const grid = document.getElementById("productGrid");
    const searchText = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchableText = [
            product.name,
            product.category,
            product.description,
            ...product.tags
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filteredProducts.map(product => `
        <article class="product-card" data-id="${product.id}">
            <div class="product-art">
                <span class="category-tag">${product.category}</span>
                <span class="emoji">${product.emoji}</span>
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>

                <div class="product-bottom">
                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button class="add-button" data-add="${product.id}">
                        + Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    document.getElementById("noProducts")
        .classList.toggle("hidden", filteredProducts.length > 0);
}

// Add a product to the cart.
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    recordRecentlyViewed(productId);
    saveData();
    renderCart();

    showToast(product.name + " added to your cart!");
}

// Change product quantity.
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== productId);
    }

    saveData();
    renderCart();
}

// Remove a product completely.
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveData();
    renderCart();

    showToast("Product removed from cart.");
}

// Display shopping cart contents and totals.
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);

        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const delivery = subtotal === 0
        ? 0
        : subtotal >= FREE_DELIVERY_LIMIT
            ? 0
            : DELIVERY_CHARGE;

    const grandTotal = subtotal + delivery;

    document.getElementById("cartCount").textContent = totalQuantity;

    document.getElementById("cartItemLabel").textContent =
        `(${totalQuantity} ${totalQuantity === 1 ? "item" : "items"})`;

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) return "";

        return `
            <div class="cart-row">
                <div class="cart-emoji">${product.emoji}</div>

                <div>
                    <div class="cart-product-name">${product.name}</div>
                    <div class="cart-product-price">
                        ${formatPrice(product.price)} each
                    </div>

                    <div class="quantity-control">
                        <button data-change="-1" data-id="${product.id}"
                                aria-label="Decrease quantity">−</button>
                        <span>${item.quantity}</span>
                        <button data-change="1" data-id="${product.id}"
                                aria-label="Increase quantity">+</button>
                    </div>
                </div>

                <div class="cart-row-total">
                    ${formatPrice(product.price * item.quantity)}
                    <button class="remove-button"
                            data-remove="${product.id}">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    emptyCart.classList.toggle("hidden", cart.length > 0);

    document.getElementById("subtotal").textContent =
        formatPrice(subtotal);

    document.getElementById("deliveryCharge").textContent =
        formatPrice(delivery);

    document.getElementById("grandTotal").textContent =
        formatPrice(grandTotal);

    const deliveryNote = document.getElementById("deliveryNote");

    if (subtotal === 0) {
        deliveryNote.textContent = "Add products to your cart to begin.";
    } else if (subtotal >= FREE_DELIVERY_LIMIT) {
        deliveryNote.textContent = "Congratulations! You qualify for free delivery.";
    } else {
        deliveryNote.textContent =
            `Add ${formatPrice(FREE_DELIVERY_LIMIT - subtotal)} more for free delivery.`;
    }

    document.getElementById("checkoutButton").disabled =
        cart.length === 0;
}

// Display recently viewed products.
function renderRecentlyViewed() {
    const recentItems = document.getElementById("recentItems");
    const emptyHistory = document.getElementById("emptyHistory");

    recentItems.innerHTML = recentlyViewed.map(productId => {
        const product = products.find(p => p.id === productId);

        if (!product) return "";

        return `
            <div class="recent-item">
                <div class="recent-emoji">${product.emoji}</div>

                <div class="recent-item-info">
                    <strong>${product.name}</strong>
                    <small>${formatPrice(product.price)}</small>
                </div>

                <button class="recent-add" data-add="${product.id}">
                    Add +
                </button>
            </div>
        `;
    }).join("");

    emptyHistory.classList.toggle(
        "hidden",
        recentlyViewed.length > 0
    );
}

// Search products as the user types.
document.getElementById("searchInput")
    .addEventListener("input", renderProducts);

// Filter products by category.
document.getElementById("categoryFilters")
    .addEventListener("click", event => {
        const button = event.target.closest("[data-category]");

        if (!button) return;

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".filter-button")
            .forEach(filter => filter.classList.remove("active"));

        button.classList.add("active");

        renderProducts();
    });

// Handle product selection and add-to-cart actions.
document.getElementById("productGrid")
    .addEventListener("click", event => {
        const addButton = event.target.closest("[data-add]");

        if (addButton) {
            addToCart(Number(addButton.dataset.add));
            return;
        }

        const card = event.target.closest(".product-card");

        if (card) {
            recordRecentlyViewed(Number(card.dataset.id));
        }
    });

// Handle add buttons in recently viewed history.
document.getElementById("recentItems")
    .addEventListener("click", event => {
        const button = event.target.closest("[data-add]");

        if (button) {
            addToCart(Number(button.dataset.add));
        }
    });

// Handle quantity changes and item removal.
document.getElementById("cartItems")
    .addEventListener("click", event => {
        const quantityButton = event.target.closest("[data-change]");
        const removeButton = event.target.closest("[data-remove]");

        if (quantityButton) {
            changeQuantity(
                Number(quantityButton.dataset.id),
                Number(quantityButton.dataset.change)
            );
        }

        if (removeButton) {
            removeFromCart(Number(removeButton.dataset.remove));
        }
    });

// Clear all cart items.
document.getElementById("clearCartButton")
    .addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Your cart is already empty.");
            return;
        }

        cart = [];
        saveData();
        renderCart();

        showToast("Shopping cart cleared.");
    });

// Clear recently viewed history.
document.getElementById("clearHistoryButton")
    .addEventListener("click", () => {
        recentlyViewed = [];

        saveData();
        renderRecentlyViewed();

        showToast("Recently viewed history cleared.");
    });

// Scroll to the shopping cart.
document.getElementById("cartButton")
    .addEventListener("click", () => {
        document.getElementById("cart")
            .scrollIntoView({ behavior: "smooth" });
    });

// Simulate checkout. No real payment is collected.
document.getElementById("checkoutButton")
    .addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Please add products before checkout.");
            return;
        }

        const subtotal = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        const delivery = subtotal >= FREE_DELIVERY_LIMIT
            ? 0
            : DELIVERY_CHARGE;

        const total = subtotal + delivery;

        const confirmed = confirm(
            "ORDER SUMMARY\n\n" +
            "Subtotal: " + formatPrice(subtotal) + "\n" +
            "Delivery: " + formatPrice(delivery) + "\n" +
            "Total: " + formatPrice(total) + "\n\n" +
            "This is a demo checkout. No payment will be collected.\n\n" +
            "Confirm this demo order?"
        );

        if (confirmed) {
            cart = [];

            saveData();
            renderCart();

            showToast("Demo order completed successfully!");
        }
    });

// Initialise the website.
renderProducts();
renderCart();
renderRecentlyViewed();
