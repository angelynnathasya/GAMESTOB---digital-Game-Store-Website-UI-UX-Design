document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    setupMenuToggle();
    setupNewsletter();

    renderCart();
    handlePurchaseForm();
});

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    container.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach((game, index) => {
        subtotal += game.price;
        container.innerHTML += `
            <div class="cart-item">
                <span>${game.name}</span>
                <button onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    });

    const tax = subtotal * 0.11;
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${(subtotal + tax).toFixed(2)}`;
    
    updateCartBadge();
}

window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCart();
};

function handlePurchaseForm() {
    const purchaseForm = document.getElementById('purchase-form');
    if (!purchaseForm) return;

    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const postal = document.getElementById('postal').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const cardHolder = document.getElementById('cardHolder').value.trim();
        const cardNo = document.getElementById('cardNumber').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (fName.length !== 6) return alert("Full Name must be exactly 6 letters");
        if (!email.includes('@') || !email.includes('.com')) return alert("Invalid Email format");
        if (!/^\d{5}$/.test(postal)) return alert("Postal code must be 5 digits");
        if (phone.length !== 12 || isNaN(phone)) return alert("Phone must be 12 digits");
        if (cardHolder !== fName) return alert("Cardholder must match Full Name");
        if (!/^\d{10}$/.test(cardNo)) return alert("Card Number must be 10 digits");
        if (cvv !== cardNo.slice(-3)) return alert("CVV must be the last 3 digits of your Card Number");

        alert("Payment Confirmed! Thank you for shopping with GAMESTOB.");
        localStorage.removeItem('myCart');
        window.location.href = 'home.html';
    });
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const badges = document.querySelectorAll('#cart-count, #cart-badge');
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = cart.length;
            badge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    });
}

function setupMenuToggle() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.querySelector('nav');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => navMenu.classList.toggle('show'));
    }
}

function setupNewsletter() {
    const emailInput = document.getElementById('email-input');
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', () => {
            const emailValue = emailInput.value;
            if (emailValue.includes('@') && emailValue.includes('.')) {
                alert("You'll get the latest updates from GAMESTOB!");
                emailInput.value = "";
            } else {
                alert("Please enter a valid email address");
            }
        });
    }
}