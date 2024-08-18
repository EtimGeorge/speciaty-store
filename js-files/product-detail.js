 // Navigation menu toggle
//  const hamburger = document.querySelector('.hamburger');
//  const navLinks = document.querySelector('.nav-links');

//  hamburger.addEventListener('click', () => {
//      navLinks.classList.toggle('nav-active');
//      hamburger.classList.toggle('toggle');
//  });

 // Quantity input functionality
 const quantityInput = document.querySelector('.quantity input');
 const decreaseBtn = document.querySelector('.decrease');
 const increaseBtn = document.querySelector('.increase');

 decreaseBtn.addEventListener('click', () => {
     if (quantityInput.value > 1) {
         quantityInput.value--;
     }
 });

 increaseBtn.addEventListener('click', () => {
     if (quantityInput.value < 10) {
         quantityInput.value++;
     }
 });

 // Tab functionality
 const tabButtons = document.querySelectorAll('.tab-button');
 const tabPanes = document.querySelectorAll('.tab-pane');

 tabButtons.forEach(button => {
     button.addEventListener('click', () => {
         const tabId = button.getAttribute('data-tab');
         
         tabButtons.forEach(btn => btn.classList.remove('active'));
         tabPanes.forEach(pane => pane.classList.remove('active'));

         button.classList.add('active');
         document.getElementById(tabId).classList.add('active');
     });
 });

 // Add to cart functionality (simulated)
 const addToCartBtn = document.querySelector('.btn-add-to-cart');
 addToCartBtn.addEventListener('click', () => {
     const quantity = quantityInput.value;
     alert(`Added ${quantity} Crystal Vase(s) to your cart!`);
 });

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

 // Image zoom effect
 const productImage = document.querySelector('.product-image img');
 productImage.addEventListener('mousemove', (e) => {
     const { left, top, width, height } = e.target.getBoundingClientRect();
     const x = (e.clientX - left) / width;
     const y = (e.clientY - top) / height;

     productImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
     productImage.style.transform = 'scale(1.5)';
 });

 productImage.addEventListener('mouseleave', () => {
     productImage.style.transformOrigin = 'center center';
     productImage.style.transform = 'scale(1)';
 });

 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });