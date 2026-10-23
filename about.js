document.addEventListener('DOMContentLoaded', () => {
   
    updateCartBadge();
    setupMenuToggle();
    setupNewsletter();

    const heroImage = document.querySelector('.about-hero');
    if (heroImage && siteImages){
    heroImage.style.backgroundImage = `url('${siteImages.nature}')`;
    console.log("URL Gambar:", heroImage.style.backgroundImage);
    }

    const cards = document.querySelectorAll('.value-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);

        card.addEventListener('click', () => {
            card.style.borderColor = '#D3968C';
            setTimeout(() => {
                card.style.borderColor = 'rgba(247, 244, 213, 0.2)';
            }, 500);
        });
    });
});
-

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