// Function to add items to the cart and store them in localStorage
function addToCart(imageUrl, name, price) {
    console.log('Adding item to cart:', name);

    // Retrieve the cart from localStorage (or create an empty array if not found)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the INR symbol and convert the price to a number
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''));

    // Create a new item object
    const newItem = {
        image: imageUrl,
        name: name,
        price: numericPrice // Store the price as a number
    };

    // Add the new item to the cart
    cart.push(newItem);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show the alert to indicate the item was added
    alert(`${name} has been added to your cart!`);

    // Update the cart display with new items and total
    displayCart();
}

// Function to display the cart and calculate total price
function displayCart() {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');

    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalContainer.innerHTML = "<p><strong>Total Price: ₹0</strong></p>";
        return;
    }

    // Calculate the total price of all items
    let totalPrice = 0;
    let cartHTML = "";

    // Loop through each item in the cart to generate the HTML and sum prices
    cart.forEach(item => {
        totalPrice += item.price; // Add the price of each item to the total

        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price.toLocaleString()}</p>
                </div>
            </div>
        `;
    });

    // Display the cart items
    cartItemsContainer.innerHTML = cartHTML;

    // Display the total price
    totalContainer.innerHTML = `<p><strong>Total Price: ₹${totalPrice.toLocaleString()}</strong></p>`;
}

// Function to clear the cart
function clearCart() {
    // Remove the cart from localStorage
    localStorage.removeItem('cart');

    // Update the cart display
    displayCart();
}

// Display the cart when the page loads
window.onload = displayCart;
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".banner img");
    let index = 0;
    setInterval(() => {
        images[index].classList.remove("visible");
        index = (index + 1) % images.length;
        images[index].classList.add("visible");
    }, 4000);
});