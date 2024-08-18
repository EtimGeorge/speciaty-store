// cart-manager.js
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function clearCart() {
  localStorage.removeItem('cart');
}

// Make sure these functions are available globally
window.getCart = getCart;
window.clearCart = clearCart;

// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('Initial cart:', cart);
function updateCartStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Cart updated in storage:', cart);
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Cart loaded:', cart);
  updateCartUI();
}
// Function to add item to cart
function addToCart(productId, name, price, image) {
    console.log('Adding to cart:', { productId, name, price, image });
    if (typeof price !== 'number' || isNaN(price)) {
        console.error('Invalid price for product:', name);
        return;
    }
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
        cart.push({ id: productId, name, price, image, quantity: 1 });
    }
    updateCartStorage();
    updateCartUI();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    updateCartUI();
}

// Function to update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartStorage();
            updateCartUI();
        }
    }
}

// Function to update localStorage
function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart UI
function updateCartUI() {
  console.log('Updating cart UI');
  const cartIcon = document.querySelector('.cart-icon');
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartIcon.textContent = `Cart (${cartItemCount})`;

  // Update cart page if it exists
  const cartContainer = document.querySelector('.cart-container');
  if (cartContainer) {
      console.log('Updating cart container');
      cartContainer.innerHTML = '';
      let total = 0;

      if (cart.length === 0) {
          cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      } else {
          cart.forEach(item => {
              const itemTotal = item.price * item.quantity;
              total += itemTotal;

              const itemElement = document.createElement('div');
              itemElement.classList.add('cart-item');
              itemElement.innerHTML = `
                  <div class="item-details">
                      <img src="${item.image}" alt="${item.name}" width="80" height="80">
                      <span class="item-name">${item.name}</span>
                  </div>
                  <span>$${item.price.toFixed(2)}</span>
                  <div class="item-quantity">
                      <button class="quantity-btn decrease" onclick="updateQuantity(${item.id}, -1)">-</button>
                      <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${item.id}, parseInt(this.value) - ${item.quantity})">
                      <button class="quantity-btn increase" onclick="updateQuantity(${item.id}, 1)">+</button>
                  </div>
                  <span class="item-total">$${itemTotal.toFixed(2)}</span>
                  <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
              `;
              cartContainer.appendChild(itemElement);
          });

          const totalElement = document.createElement('div');
          totalElement.classList.add('cart-summary');
          totalElement.innerHTML = `
              <span class="total-price">Total: $${total.toFixed(2)}</span>
              <button class="checkout-btn">Proceed to Checkout</button>
          `;
          cartContainer.appendChild(totalElement);
      }
  } else {
      console.log('Cart container not found on this page');
  }
}


// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', updateCartUI);

// Add event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Found add to cart buttons:', addToCartButtons.length);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Add to cart button clicked');
            const productCard = this.closest('.product-card');
            if (!productCard) {
                console.error('Could not find parent product card');
                return;
            }

            const productId = parseInt(this.dataset.product);
            const productNameElement = productCard.querySelector('h4');
            const productPriceElement = productCard.querySelector('p');
            const productImageElement = productCard.querySelector('img');

            if (!productNameElement || !productPriceElement || !productImageElement) {
                console.error('Could not find all required product elements');
                return;
            }

            const productName = productNameElement.textContent;
            const productPrice = parseFloat(productPriceElement.textContent.replace('$', ''));
            const productImage = productImageElement.src;

            console.log('Product details:', { productId, productName, productPrice, productImage });

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
                const cartIcon = document.querySelector('.cart-icon');
                if (cartIcon) {
                    const cartIconRect = cartIcon.getBoundingClientRect();
                    floatingItem.style.left = `${cartIconRect.left + cartIconRect.width / 2}px`;
                    floatingItem.style.top = `${cartIconRect.top + cartIconRect.height / 2}px`;
                }
                floatingItem.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                document.body.removeChild(floatingItem);
            }, 1000);
        });
    });

    // Initialize cart UI
    updateCartUI();
});

// Function to update cart UI (modified to work with your HTML structure)
function updateCartUI() {
    console.log('Updating cart UI');
    const cartIcon = document.querySelector('.cart-icon');
    const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    if (cartIcon) {
      cartIcon.textContent = `Cart (${cartItemCount})`;
    } else {
      console.warn('Cart icon not found');
    }
  
    // Update cart page if it exists
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer) {
      console.log('Updating cart container');
      cartContainer.innerHTML = '';
      let total = 0;
  
      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      } else {
        cart.forEach(item => {
          if (typeof item.price !== 'number' || isNaN(item.price)) {
            console.error('Invalid price for item:', item);
            return;
          }
          const itemTotal = item.price * (item.quantity || 1);
          total += itemTotal;
  
          const itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');
          itemElement.innerHTML = `
            <div class="item-details">
              <img src="${item.image || ''}" alt="${item.name || 'Product'}" width="80" height="80">
              <span class="item-name">${item.name || 'Unknown Product'}</span>
            </div>
            <span>$${item.price.toFixed(2)}</span>
            <div class="item-quantity">
              <button class="quantity-btn decrease" onclick="updateQuantity(${item.id}, -1)">-</button>
              <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" max="10" onchange="updateQuantity(${item.id}, parseInt(this.value) - ${item.quantity || 1})">
              <button class="quantity-btn increase" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <span class="item-total">$${itemTotal.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
          `;
          cartContainer.appendChild(itemElement);
        });
  
        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-summary');
        totalElement.innerHTML = `
          <span class="total-price">Total: $${total.toFixed(2)}</span>
          <button class="checkout-btn">Proceed to Checkout</button>
        `;
        cartContainer.appendChild(totalElement);
      }
    } else {
      console.log('Cart container not found on this page');
    }
  }
  
  // ... (rest of the code remains the same)
  
  // Make sure to call loadCart when the DOM is ready
  document.addEventListener('DOMContentLoaded', loadCart);