 // Update total price
//   function updateTotalPrice() {
//      const totalPrice = parseFloat(document.getElementById('total-price').textContent.replace('$', ''));
//      const tax = totalPrice * 0.08;
//      const finalPrice = totalPrice + tax;
//      document.getElementById('final-price').textContent = `$${finalPrice.toFixed(2)}`;
//  }


 // Cart functionality
//  const cartItems = document.querySelectorAll('.cart-item');
//  const totalPriceElement = document.querySelector('.total-price');

//  cartItems.forEach(item => {
//      const decreaseBtn = item.querySelector('.decrease');
//      const increaseBtn = item.querySelector('.increase');
//      const quantityInput = item.querySelector('.quantity-input');
//      const removeBtn = item.querySelector('.remove-item');
//      const itemTotal = item.querySelector('.item-total');
//      const itemPrice = parseFloat(item.querySelector('span:nth-child(2)').textContent.replace('$', ''));

//      decreaseBtn.addEventListener('click', () => updateQuantity(-1));
//      increaseBtn.addEventListener('click', () => updateQuantity(1));
//      quantityInput.addEventListener('change', () => updateTotal());
//      removeBtn.addEventListener('click', () => removeItem(item));

//      function updateQuantity(change) {
//          let newQuantity = parseInt(quantityInput.value) + change;
//          if (newQuantity >= 1 && newQuantity <= 10) {
//              quantityInput.value = newQuantity;
//              updateTotal();
//          }
//      }

//      function updateTotal() {
//          const quantity = parseInt(quantityInput.value);
//          const total = (itemPrice * quantity).toFixed(2);
//          itemTotal.textContent = `$${total}`;
//          updateCartTotal();
//      }
//  });

//  function removeItem(item) {
//      item.style.animation = 'slideIn 0.3s ease-in-out reverse';
//      setTimeout(() => {
//          item.remove();
//          updateCartTotal();
//      }, 300);
//  }

//  function updateCartTotal() {
//      let total = 0;
//      cartItems.forEach(item => {
//          const itemTotal = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));
//          total += itemTotal;
//      });
//      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
//  }


// Checkout button animation
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('mouseover', () => {
        checkoutBtn.style.transform = 'scale(1.05)';
    });
    checkoutBtn.addEventListener('mouseout', () => {
        checkoutBtn.style.transform = 'scale(1)';
    });
    checkoutBtn.addEventListener('click', () => {
        checkoutBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            checkoutBtn.style.transform = 'scale(1)';
            alert('Proceeding to checkout!');
        }, 150);
    });
}

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

// Add animation to cart items on load
window.addEventListener('load', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
        item.style.animation = `slideIn 0.3s ease-in-out ${index * 0.1}s both`;
    });
});

// Floating animation for categories (if present on the page)
const categories = document.querySelectorAll('.category');
categories.forEach((category, index) => {
    category.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
});

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

categories.forEach(category => {
    observer.observe(category);
});

// Interactive hover effect for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1) rotate(5deg)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// This function is to handle the "Proceed to Checkout" button click
function proceedToCheckout() {
    // Get the cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Redirect to the checkout page, passing the cart data as a query parameter
    window.location.href = getCheckoutUrl() + '?cart=' + encodeURIComponent(JSON.stringify(cart));
}

function getCheckoutUrl() {
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    return `${window.location.origin}${basePath}checkout.html`;
}

window.addEventListener('load', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn && document.body.contains(checkoutBtn)) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});
