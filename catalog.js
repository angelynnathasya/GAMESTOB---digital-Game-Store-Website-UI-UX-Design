document.addEventListener("DOMContentLoaded", () => {
    initGlobalFeatures();

    const catalogGrid = document.getElementById("catalog-grid");
    const searchInput = document.getElementById("global-search-input");
    const allGenresCheckbox = document.getElementById('genre-all');
    const subGenreCheckboxes = document.querySelectorAll('.genre-checkbox');
    const btnApply = document.getElementById("btn-apply");
    const btnReset = document.getElementById("btn-reset");

    if (btnApply) btnApply.addEventListener("click", executeKatalogFiltering);
    if (btnReset) btnReset.addEventListener("click", resetFilters);
    if (searchInput) searchInput.addEventListener("input", executeKatalogFiltering);

    renderCatalogGames(globalGamesData);


    function renderCatalogGames(gamesList) {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = ""; 
        
        if (gamesList.length === 0) {
            catalogGrid.innerHTML = `<p style="color: #F7F4D5; text-align: center; grid-column: 1/-1; padding: 40px;">No games found.</p>`;
            return;
        }

        gamesList.forEach(game => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            
            // Generate platform icons
            let platformIconsHTML = "";
            if (game.platform.includes("PC")) platformIconsHTML += `<i class="fa-solid fa-desktop"></i> `;
            if (game.platform.includes("PLAYSTATION")) platformIconsHTML += `<i class="fa-brands fa-playstation"></i> `;
            if (game.platform.includes("XBOX")) platformIconsHTML += `<i class="fa-brands fa-xbox"></i> `;

            cardDiv.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <div class="card-info">
                    <span class="game-name">${game.name}</span>
                    <div class="card-meta-tags"><span class="genre-pill">${game.genre}</span></div>
                    <div class="card-footer-row">
                        <div class="platform-icons">${platformIconsHTML}</div>
                        <span class="price">$${game.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            `;

            cardDiv.querySelector(".add-to-cart-btn").addEventListener("click", () => {
                addToCart(game);
            });

            catalogGrid.appendChild(cardDiv);
        });
        
        const countDisplay = document.getElementById("items-count");
        if (countDisplay) countDisplay.innerText = `Showing ${gamesList.length} games`;
    }

    function executeKatalogFiltering() {
        const searchKeyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedGenres = Array.from(subGenreCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toUpperCase().trim());

        const filtered = globalGamesData.filter(game => {
            const matchesSearch = game.name.toLowerCase().includes(searchKeyword);
            const matchesGenre = allGenresCheckbox.checked || selectedGenres.length === 0 || selectedGenres.includes(game.genre.toUpperCase().trim());
            return matchesSearch && matchesGenre;
        });

        renderCatalogGames(filtered);
    }

    function resetFilters() {
        if(allGenresCheckbox) allGenresCheckbox.checked = true;
        subGenreCheckboxes.forEach(cb => cb.checked = false);
        if(searchInput) searchInput.value = "";
        renderCatalogGames(globalGamesData);
    }
});

function initGlobalFeatures() {
    updateCartBadge();
    setupMenuToggle();
    setupNewsletter();
}

function addToCart(game) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push(game);
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartBadge();
    alert(`${game.name} added to cart!`);
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
    const newsletterBtn = document.getElementById('subscribe-btn'); // Pastikan ID ini sama di HTML
    if (newsletterBtn && emailInput) {
        newsletterBtn.addEventListener('click', () => {
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