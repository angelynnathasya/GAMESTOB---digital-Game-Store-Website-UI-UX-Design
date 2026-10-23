document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    setupMenuToggle();
    setupNewsletter();
    setupSearchFunctionality(); 

    const heroSection = document.querySelector('.locations-hero');
    if (heroSection && typeof siteImages !== 'undefined' && siteImages.nature) {
        heroSection.style.backgroundImage = `url('${siteImages.nature}')`;
        console.log("URL Gambar:", heroSection.style.backgroundImage);
    }
    renderLocations();
});

// --- FUNGSI RENDER LOKASI ---
function renderLocations() {
    const grid = document.querySelector('.locations-grid');
    if (!grid || typeof locationsData === 'undefined') return; 

    grid.innerHTML = ""; 

    locationsData.forEach(loc => {
        const card = document.createElement('div');
        card.className = 'location-card';
        card.innerHTML = `
            <img src="${loc.image}" alt="${loc.name}">
            <div class="card-content">
                <h3>${loc.name}</h3>
                <p class="country">${loc.country}</p>
                <p class="address">${loc.address}</p>
                <p class="hours">Open Daily<br>${loc.hours}</p>
            </div>
        `;
        grid.appendChild(card);
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

function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            alert("Search function for locations is coming soon!");
        }
    });
}