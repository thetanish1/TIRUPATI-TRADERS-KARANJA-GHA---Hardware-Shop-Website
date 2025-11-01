// Initialize Swiper
var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
});

// Show product form function
function showForm(product) {
    // Hide all forms first
    document.querySelectorAll('.product-forms').forEach(form => {
        form.classList.remove('active-form');
    });
    
    // Show the selected form
    document.getElementById(product + '-form').classList.add('active-form');
    
    // Scroll to the form
    document.getElementById(product + '-form').scrollIntoView({ behavior: 'smooth' });
}

// Cart functionality
let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
    showCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((product, index) => {
        total += product.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <h4>${product.item}</h4>
                <p class="item-price">₹ ${product.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="btn" style="padding: 5px 10px; background: var(--secondary);">Remove</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `Total: ₹ ${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    document.getElementById('cart').style.display = 'block';
    document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = "Hello Tirupati Traders, I would like to order the following items:%0A";
    let total = 0;
    
    cart.forEach(product => {
        message += `- ${product.item}: ₹ ${product.price}%0A`;
        total += product.price;
    });
    
    message += `%0ATotal: ₹ ${total}%0A%0APlease contact me for delivery details.`;
    
    const phoneNumber = "919876543210";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// Form submissions
document.getElementById('cementOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder('cement');
});

document.getElementById('ironOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder('iron');
});

document.getElementById('doorsOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder('doors');
});

function submitOrder(type) {
    let message = "";
    const phoneNumber = "919876543210";
    
    if (type === 'cement') {
        const name = document.getElementById('name').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const company = document.getElementById('cementCompany').value;
        const quantity = document.getElementById('cementQuantity').value;
        const rate = document.getElementById('cementRate').value;
        const address = document.getElementById('deliveryAddress').value;
        const date = document.getElementById('deliveryDate').value;
        const time = document.getElementById('deliveryTime').value;
        const deliveryCharges = document.getElementById('deliveryCharges').value;
        const workerCharges = document.getElementById('workerCharges').value;
        
        const total = (quantity * rate) + parseInt(deliveryCharges) + parseInt(workerCharges);
        
        message = `Hello Tirupati Traders, I would like to order cement:%0A%0A` +
                  `Name: ${name}%0A` +
                  `WhatsApp: ${whatsapp}%0A` +
                  `Cement Company: ${company}%0A` +
                  `Quantity: ${quantity} bags%0A` +
                  `Rate: ₹ ${rate} per bag%0A` +
                  `Delivery Address: ${address}%0A` +
                  `Preferred Delivery: ${date} ${time}%0A` +
                  `Delivery Charges: ₹ ${deliveryCharges}%0A` +
                  `Worker Charges: ₹ ${workerCharges}%0A` +
                  `Total: ₹ ${total}%0A%0A` +
                  `Please confirm my order.`;
    }
    else if (type === 'iron') {
        const name = document.getElementById('ironName').value;
        const whatsapp = document.getElementById('ironWhatsapp').value;
        const ironType = document.getElementById('ironType').value;
        const ironSize = document.getElementById('ironSize').value;
        const ironKg = document.getElementById('ironKg').value;
        const ironQuintal = document.getElementById('ironQuintal').value;
        const ironRate = document.getElementById('ironRate').value;
        const address = document.getElementById('ironAddress').value;
        const date = document.getElementById('ironDeliveryDate').value;
        const time = document.getElementById('ironDeliveryTime').value;
        const deliveryCharges = document.getElementById('ironDeliveryCharges').value;
        const workerCharges = document.getElementById('ironWorkerCharges').value;
        
        const quantity = ironQuintal || (ironKg / 100);
        const total = (quantity * ironRate) + parseInt(deliveryCharges) + parseInt(workerCharges);
        
        message = `Hello Tirupati Traders, I would like to order iron:%0A%0A` +
                  `Name: ${name}%0A` +
                  `WhatsApp: ${whatsapp}%0A` +
                  `Iron Type: ${ironType}%0A` +
                  `Size: ${ironSize}%0A` +
                  `Quantity: ${ironQuintal ? ironQuintal + ' quintals' : ironKg + ' kg'}%0A` +
                  `Rate: ₹ ${ironRate} per quintal%0A` +
                  `Delivery Address: ${address}%0A` +
                  `Preferred Delivery: ${date} ${time}%0A` +
                  `Delivery Charges: ₹ ${deliveryCharges}%0A` +
                  `Worker Charges: ₹ ${workerCharges}%0A` +
                  `Total: ₹ ${total}%0A%0A` +
                  `Please confirm my order.`;
    }
    else if (type === 'doors') {
        const name = document.getElementById('doorsName').value;
        const whatsapp = document.getElementById('doorsWhatsapp').value;
        const address = document.getElementById('doorsAddress').value;
        const date = document.getElementById('doorsDeliveryDate').value;
        const time = document.getElementById('doorsDeliveryTime').value;
        const deliveryCharges = document.getElementById('doorsDeliveryCharges').value;
        const workerCharges = document.getElementById('doorsWorkerCharges').value;
        
        const selectedProducts = Array.from(document.querySelectorAll('input[name="doorsProducts"]:checked'))
            .map(cb => cb.value);
        const specifications = document.getElementById('doorSpecifications').value;
        
        message = `Hello Tirupati Traders, I would like to order doors/plywood:%0A%0A` +
                  `Name: ${name}%0A` +
                  `WhatsApp: ${whatsapp}%0A` +
                  `Products: ${selectedProducts.join(', ')}%0A` +
                  `Specifications: ${specifications}%0A` +
                  `Delivery Address: ${address}%0A` +
                  `Preferred Delivery: ${date} ${time}%0A` +
                  `Delivery Charges: ₹ ${deliveryCharges}%0A` +
                  `Worker Charges: ₹ ${workerCharges}%0A%0A` +
                  `Please contact me with available options and pricing.`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    document.getElementById(type + 'OrderForm').reset();
    alert('Your order has been submitted! We will contact you shortly on WhatsApp.');
}

// Google Maps
function initMap() {
    // For demo purposes, using a placeholder location
    // In production, replace with your actual coordinates
    const location = { lat: 20.7453, lng: 78.6022 }; // Approximate coordinates for Wardha, Maharashtra
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "TIRUPATI TRADERS KARANJA (GHA)",
    });
}

// Set minimum date for delivery as tomorrow
function setMinDeliveryDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        dateInput.min = formattedDate;
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setMinDeliveryDate();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Auto-fill random WhatsApp number for demo (remove in production)
    const randomNumber = '98765' + Math.floor(10000 + Math.random() * 90000);
    document.querySelectorAll('input[type="tel"]').forEach(telInput => {
        telInput.value = randomNumber;
    });
});

// Mobile menu functionality
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    header.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        menuToggle.classList.toggle('active');
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // Fix for mobile viewport height
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
});



