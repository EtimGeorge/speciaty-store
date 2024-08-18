  // Navigation menu toggle
  // const hamburger = document.querySelector('.hamburger');
  // const navLinks = document.querySelector('.nav-links');

  // hamburger.addEventListener('click', () => {
  //     navLinks.classList.toggle('nav-active');
  //     hamburger.classList.toggle('toggle');
  // });

  // Product data (simulated)
  const products = [
      { id: 1, name: "Crystal Vase", price: 59.99, category: "kitchenware", image: "https://via.placeholder.com/250x200?text=Crystal+Vase" },
      { id: 2, name: "Gourmet Coffee", price: 24.99, category: "groceries", image: "https://via.placeholder.com/250x200?text=Gourmet+Coffee" },
      { id: 3, name: "Luxury Bedding Set", price: 149.99, category: "bedding", image: "https://via.placeholder.com/250x200?text=Luxury+Bedding+Set" },
      { id: 4, name: "Stainless Steel Cookware Set", price: 199.99, category: "kitchenware", image: "https://via.placeholder.com/250x200?text=Cookware+Set" },
      { id: 5, name: "Organic Body Lotion", price: 19.99, category: "health-beauty", image: "https://via.placeholder.com/250x200?text=Body+Lotion" },
      { id: 6, name: "Smart LED Bulb", price: 29.99, category: "lighting", image: "https://via.placeholder.com/250x200?text=LED+Bulb" },
      { id: 7, name: "Premium Red Wine", price: 39.99, category: "liquor", image: "https://via.placeholder.com/250x200?text=Red+Wine" },
      { id: 8, name: "Baking Mix Set", price: 34.99, category: "baking-supplies", image: "https://via.placeholder.com/250x200?text=Baking+Mix" },
      { id: 9, name: "Electric Kettle", price: 49.99, category: "small-appliances", image: "https://via.placeholder.com/250x200?text=Electric+Kettle" },
      { id: 10, name: "Eco-friendly Cleaning Kit", price: 39.99, category: "home-care", image: "https://via.placeholder.com/250x200?text=Cleaning+Kit" },
      { id: 11, name: "Chef's Knife Set", price: 89.99, category: "kitchen-utensils", image: "https://via.placeholder.com/250x200?text=Knife+Set" },
      { id: 12, name: "Aromatherapy Diffuser", price: 44.99, category: "home-care", image: "https://via.placeholder.com/250x200?text=Diffuser" },
  ];

  // Function to create product card// Modify the createProductCard function to use the correct data-id attribute
function createProductCard(product) {
  return `
      <div class="product-card" data-category="${product.category}">
          <img src="${product.image}" alt="${product.name}" width="250" height="200">
          <div class="product-info">
              <h3>${product.name}</h3>
              <p>$${product.price.toFixed(2)}</p>
              <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
      </div>
  `;
}

  // Function to display products
  function displayProducts(productsToShow) {
      const productGrid = document.getElementById('product-grid');
      productGrid.innerHTML = productsToShow.map(createProductCard).join('');
  }

  // Initial display
  displayProducts(products);

  // Sorting functionality
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', () => {
      const sortedProducts = [...products];
      switch (sortSelect.value) {
          case 'price-low-high':
              sortedProducts.sort((a, b) => a.price - b.price);
              break;
          case 'price-high-low':
              sortedProducts.sort((a, b) => b.price - a.price);
              break;
          case 'newest':
              sortedProducts.reverse();
              break;
          default:
              // Featured (original order)
              break;
      }
      displayProducts(sortedProducts);
  });

  // Filtering functionality
  const categorySelect = document.getElementById('category-select');
  categorySelect.addEventListener('change', () => {
      const selectedCategory = categorySelect.value;
      const filteredProducts = selectedCategory === 'all' 
          ? products 
          : products.filter(product => product.category === selectedCategory);
      displayProducts(filteredProducts);
  });

  // Add to cart functionality
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart(product.id, product.name, product.price, product.image);
            
            // Floating item animation
            const floatingItem = document.createElement('div');
            floatingItem.textContent = '🧁';
            floatingItem.style.position = 'fixed';
            floatingItem.style.zIndex = '9999';
            floatingItem.style.left = `${e.target.getBoundingClientRect().left}px`;
            floatingItem.style.top = `${e.target.getBoundingClientRect().top}px`;
            floatingItem.style.transition = 'all 1s ease';
            document.body.appendChild(floatingItem);

            setTimeout(() => {
                const cartIcon = document.querySelector('.cart-icon');
                floatingItem.style.left = `${cartIcon.getBoundingClientRect().left}px`;
                floatingItem.style.top = `${cartIcon.getBoundingClientRect().top}px`;
                floatingItem.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                document.body.removeChild(floatingItem);
            }, 1000);
        }
    }
});

  // Pagination (simulated)
  const itemsPerPage = 6;
  let currentPage = 1;

  function updatePagination() {
      const totalPages = Math.ceil(products.length / itemsPerPage);
      const prevButton = document.getElementById('prev-page');
      const nextButton = document.getElementById('next-page');

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      displayProducts(products.slice(start, end));
  }

  document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          updatePagination();
      }
  });

  document.getElementById('next-page').addEventListener('click', () => {
      const totalPages = Math.ceil(products.length / itemsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          updatePagination();
      }
  });

  // Initial pagination setup
  updatePagination();

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