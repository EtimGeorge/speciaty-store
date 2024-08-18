document.addEventListener('DOMContentLoaded', () => {
    // Retrieve order information from localStorage
    const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));

    if (orderInfo) {
        // Populate customer details
        document.getElementById('customer-name').textContent = orderInfo.customer.fullName;
        document.getElementById('customer-email').textContent = orderInfo.customer.email;
        document.getElementById('customer-phone').textContent = orderInfo.customer.phone;
        document.getElementById('shipping-address').textContent = `${orderInfo.customer.address}, ${orderInfo.customer.city}, ${orderInfo.customer.country}`;

        // Generate a random order number (you may want to implement a more robust system)
        document.getElementById('order-number').textContent = '#SC' + Math.floor(Math.random() * 100000);

        // Populate order items
        const orderItemsContainer = document.getElementById('order-items');
        orderInfo.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            orderItemsContainer.appendChild(itemElement);
        });

        // Populate order total
        document.getElementById('order-total').textContent = `$${orderInfo.total.toFixed(2)}`;
    } else {
        // Handle case where order information is not available
        document.querySelector('.confirmation-container').innerHTML = '<p>Order information not found. Please return to the checkout page.</p>';
    }

    // Clear the order information from localStorage
    localStorage.removeItem('orderInfo');
});