 // Navigation menu toggle
//  const hamburger = document.querySelector('.hamburger');
//  const navLinks = document.querySelector('.nav-links');

//  hamburger.addEventListener('click', () => {
//      navLinks.classList.toggle('nav-active');
//      hamburger.classList.toggle('toggle');
//  });



 // Carousel functionality
 const carousel = document.querySelector('.carousel-container');
 const slides = document.querySelectorAll('.carousel-slide');
 const prevBtn = document.querySelector('.carousel-button-prev');
 const nextBtn = document.querySelector('.carousel-button-next');

 let currentIndex = 0;

 function showSlide(index) {
     carousel.style.transform = `translateX(-${index * 100}%)`;
 }

 function nextSlide() {
     currentIndex = (currentIndex + 1) % slides.length;
     showSlide(currentIndex);
 }

 function prevSlide() {
     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
     showSlide(currentIndex);
 }

 nextBtn.addEventListener('click', nextSlide);
 prevBtn.addEventListener('click', prevSlide);

 // Auto-rotate carousel
 setInterval(nextSlide, 5000);

 // Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with email: ${email}`);
    newsletterForm.reset();
});

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .category-card, .promotion-card, .review-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Sticky header
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
    const cartIcon = document.querySelector('.cart-icon');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            const productId = Date.now(); // Using timestamp as a simple unique ID

            // Add item to cart using the function from cart-manager.js
            addToCart(productId, productName, productPrice, productImage);

            // Floating item animation
            const floatingItem = document.createElement('div');
            floatingItem.textContent = '🧁';
            floatingItem.style.position = 'fixed';
            floatingItem.style.zIndex = '9999';
            floatingItem.style.left = `${e.clientX}px`;
            floatingItem.style.top = `${e.clientY}px`;
            floatingItem.style.transition = 'all 1s ease';
            document.body.appendChild(floatingItem);

            setTimeout(() => {
                const cartIconRect = cartIcon.getBoundingClientRect();
                floatingItem.style.left = `${cartIconRect.left + cartIconRect.width / 2}px`;
                floatingItem.style.top = `${cartIconRect.top + cartIconRect.height / 2}px`;
                floatingItem.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                document.body.removeChild(floatingItem);
            }, 1000);
        });
    });
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.warn('Unhandled promise rejection:', event.reason);
});