document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    populateOrderSummary(cart);
    setupPaymentMethodSelection();
    setupFormSubmission(cart);
});

function populateOrderSummary(cart) {
    const orderSummary = document.querySelector('.order-summary');
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        orderSummary.insertBefore(itemElement, orderSummary.lastElementChild);

        total += item.price * item.quantity;
    });

    const totalElement = orderSummary.querySelector('.order-total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function setupPaymentMethodSelection() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        });
    });
}

function setupFormSubmission(cart) {
    const form = document.getElementById('checkout-form');
    if (!form) {
        console.error('Checkout form not found');
        return;
    }
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const selectedPaymentMethod = document.querySelector('.payment-method.selected');

        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        const paymentMethod = selectedPaymentMethod.dataset.method;
        const orderData = {
            cart: cart,
            customer: Object.fromEntries(formData.entries()),
            paymentMethod: paymentMethod,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        try {
            const response = await processPayment(orderData);
            if (response.success) {
                handlePaymentSuccess(orderData);
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

async function processPayment(orderData) {
    // This is a mock function. In a real scenario, you would integrate with your payment gateway API here.
    console.log('Processing payment:', orderData);
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate a successful payment
            resolve({ success: true, message: 'Payment processed successfully' });
        }, 2000);
    });
}

function storeOrderInfo(orderData) {
    const orderInfo = {
        customer: orderData.customer,
        cart: orderData.cart,
        total: orderData.total
    };
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
}

function handlePaymentSuccess(orderData) {
    // Store order information
    storeOrderInfo(orderData);
    
    // Clear the cart
    localStorage.removeItem('cart');
    
    // Determine the correct path to the thank you page
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const thankYouUrl = `${window.location.origin}${basePath}order-confirmation.html`;
    
    // Redirect to the thank you page
    window.location.href = thankYouUrl;
}

// Animations
const checkoutContainer = document.querySelector('.checkout-container');
const checkoutForm = document.getElementById('checkout-form');
const orderSummary = document.querySelector('.order-summary');

window.addEventListener('load', () => {
    checkoutContainer.style.opacity = '1';
    checkoutForm.style.transform = 'translateY(0)';
    orderSummary.style.transform = 'translateY(0)';
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

// Place Order button animation
const placeOrderBtn = document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('mouseover', () => {
    placeOrderBtn.style.transform = 'translateY(-2px) scale(1.05)';
});
placeOrderBtn.addEventListener('mouseout', () => {
    placeOrderBtn.style.transform = 'translateY(0) scale(1)';
});
placeOrderBtn.addEventListener('click', () => {
    placeOrderBtn.style.transform = 'translateY(2px) scale(0.95)';
    setTimeout(() => {
        placeOrderBtn.style.transform = 'translateY(0) scale(1)';
    }, 150);
});