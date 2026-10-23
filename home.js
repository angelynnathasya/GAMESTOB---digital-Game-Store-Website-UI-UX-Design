document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderHomeGames(globalGamesData);
    setupSearchFunctionality();
    setupMenuToggle();
    setupNewsletter();
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const badges = document.querySelectorAll('#cart-count, #cart-badge'); // Ambil kedua ID
    
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = cart.length;
            badge.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

function addToCart(game) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push(game);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartBadge();
    alert(`${game.name} added to cart!`);
}

// 3. RENDER GAME (Disinkronkan dengan fungsi addToCart)
function renderHomeGames(gamesData) {
    const latestGrid = document.getElementById('latest-grid');
    const bestsellerGrid = document.getElementById('bestseller-grid');
    const dlcGrid = document.getElementById('dlc-grid');

    if (latestGrid) latestGrid.innerHTML = '';
    if (bestsellerGrid) bestsellerGrid.innerHTML = '';
    if (dlcGrid) dlcGrid.innerHTML = '';

    let counts = { latest: 0, bestseller: 0, dlc: 0 };

    gamesData.forEach(game => {
        const cardHTML = `
            <div class="card">
                <img src="${game.image}" alt="${game.name}">
                <div class="card-info">
                    <span class="game-name">${game.name}</span>
                    <div class="card-meta">
                        <span class="genre">${game.genre}</span>
                        <span class="price">$${game.price.toFixed(2)}</span>
                    </div>
                    <div class="card-footer-action">
                        <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(game)})'>
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (game.section === 'latest' && latestGrid) {
            latestGrid.innerHTML += cardHTML;
            counts.latest++;
        }
        if (game.section === 'bestseller' && bestsellerGrid) {
            bestsellerGrid.innerHTML += cardHTML;
            counts.bestseller++;
        }
        if (game.section === 'dlc' && dlcGrid) {
            dlcGrid.innerHTML += cardHTML;
            counts.dlc++;
        }
    });

    toggleSectionVisibility('section-latest', counts.latest);
    toggleSectionVisibility('section-bestseller', counts.bestseller);
    toggleSectionVisibility('section-dlc', counts.dlc);
}

function toggleSectionVisibility(sectionId, count) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) sectionElement.style.display = count > 0 ? 'block' : 'none';
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        const filteredGames = globalGamesData.filter(game => 
            game.name.toLowerCase().includes(keyword)
        );
        renderHomeGames(filteredGames);
    });
}

function setupMenuToggle() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.querySelector('nav');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

function setupNewsletter() {
    const emailInput = document.getElementById('email-input');
    const newsletterBtn = document.getElementById('newsletter-btn');

    if (newsletterBtn && emailInput) {
        newsletterBtn.addEventListener('click', () => {
            const emailValue = emailInput.value;
            if (emailValue.includes('@') && emailValue.includes('.')) {
                alert("You'll get the latest updates from GAMESTOB!");
                emailInput.value = "";
            } else {
                alert("Please enter a valid email address (e.g., example@domain.com)");
            }
        });
    }
}