const hamburger = document.getElementById('hamburger_menu');
const closeMenu = document.getElementById('close_menu');
const menuList = document.getElementById('menu_list');
const overlay = document.getElementById('overlay');

// Toggle menu open when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    menuList.classList.add('open');
    overlay.classList.add('active');
});

// Close menu when close icon is clicked
closeMenu.addEventListener('click', () => {
    menuList.classList.remove('open');
    overlay.classList.remove('active');
});

// Close menu when overlay is clicked
overlay.addEventListener('click', () => {
    menuList.classList.remove('open');
    overlay.classList.remove('active');
});


// product section

let currentImageIndex = 0; // To track the current image being shown

const images = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg'
];

// Function to change main image (outside the lightbox)
function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
    updateActiveThumbnail(imageSrc, 'thumbnails'); // Apply active class to the thumbnails in the main section
}

// Function to open the lightbox
function openLightbox() {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('overlay2').classList.add('active');
}

// Function to close the lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('overlay2').classList.remove('active');
}

// Function to change lightbox image when clicking thumbnails inside the lightbox
function changeLightboxImage(imageSrc) {
    document.getElementById('lightboxImage').src = imageSrc;
    currentImageIndex = images.indexOf(imageSrc);
    updateActiveThumbnail(imageSrc, 'lightbox-thumbnails'); // Apply active class to the thumbnails in the lightbox
}

// Function to navigate through images in the lightbox
function navigateLightbox(direction) {
    currentImageIndex += direction;

    // Loop through images
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const newImageSrc = images[currentImageIndex];
    document.getElementById('lightboxImage').src = newImageSrc;
    document.getElementById('mainImage').src = newImageSrc;
    updateActiveThumbnail(newImageSrc, 'lightbox-thumbnails'); // Apply active class to lightbox thumbnails
}

// Function to update active thumbnail by setting opacity to 50%
function updateActiveThumbnail(imageSrc, containerClass) {
    // Remove 'active-thumbnail' class from all thumbnails in the specified container
    const allThumbnails = document.querySelectorAll(`.${containerClass} img`);
    allThumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active-thumbnail');
    });

    // Add 'active-thumbnail' class to the clicked/active thumbnail
    const activeThumbnail = document.querySelector(`.${containerClass} img[src="${imageSrc.replace('"', '\\"')}"]`);
    if (activeThumbnail) {
        activeThumbnail.classList.add('active-thumbnail');
    }
}


let count = 0;

function increment() {
    count++;
    document.getElementById('count').innerText = count;
}

function decrement() {
    count--;
    document.getElementById('count').innerText = count;
}










let cart = []; // To store cart items
let countt = 0; // Product count

// Function to increment quantity
function increment() {
  countt++;
  document.getElementById("count").innerText = countt;
}

// Function to decrement quantity
function decrement() {
  if (countt > 0) {
    countt--;
    document.getElementById("count").innerText = countt;
  }
}

// Add product to the cart
function addToCart() {
  if (countt > 0) {
    const product = {
      name: "Fall Limited Edition Sneakers",
      price: 125.00,
      quantity: countt,
      total: 125.00 * countt
    };
    
    cart = [product]; // In this example, we handle only one product type. You can extend this for multiple products.
    displayCartItems();
  }
}

// Toggle Cart Dropdown visibility
function toggleCartDropdown() {
  const cartDropdown = document.getElementById('cart_dropdown');
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}

// Display Cart Items in the dropdown
function displayCartItems() {
  const cartItemsDiv = document.getElementById('cart_items');
  const checkoutButton = document.getElementById('checkout_button');
  
  // Clear the previous items
  cartItemsDiv.innerHTML = '';
  
  // Check if the cart is not empty
  if (cart.length > 0) {
    cart.forEach(item => {
      const cartItem = `
        <div class="cart_item">
          <img src="images/image-product-1-thumbnail.jpg" alt="Product Thumbnail">
          <div class="cart_item_details">
            <h5>${item.name}</h5>
            <span>${item.price} x ${item.quantity} = <strong class="total_cost">$${item.total}</strong></span>
          </div>
          <img src="images/icon-delete.svg" alt="Delete Icon" class="delete_icon" onclick="removeCartItem()">
        </div>
      `;
      cartItemsDiv.innerHTML += cartItem;
    });

    // Show the checkout button
    checkoutButton.style.display = 'block';
  } else {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    checkoutButton.style.display = 'none';
  }
}

// Remove item from the cart
function removeCartItem() {
  cart = []; // Remove all items (since there's only one product in this example)
  displayCartItems();
}

// Attach add to cart functionality
document.getElementById('add').addEventListener('click', addToCart);
