/* Removing Items from the Cart */
let removeCartItemButtons = document.getElementsByClassName('btn-danger');

for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

/* Adding multiple Items to the Cart and doing the condition check */
let quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (let i = 0; i< quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

/* "Add to Cart" Button Behaviour */
let addToCartButtons = document.getElementsByClassName('shop-item-button');
for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
    
}

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, image);
    updateCartTotal();
}

/* Rendering the Content Added to Cart */
function addItemToCart(title, price, image) {
    let cartRow = document.createElement('div');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Already added to cart");
            return;
        }
        
    }
    let cartRowContents = `
    <div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src=${image}>
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged);
}

/* Updating Total Price of the items added in the Cart */
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = priceElement.innerText.replace(/₹|,|-/g,'');
        price = price.replace(/\//g,'');
        price = parseFloat(price);
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('cart-total-price')[0].innerText = '₹'+total;
}

/* Order Button Clicked Behaviour */
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', orderClicked);

function orderClicked() {
    let cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.hasChildNodes() == 0) {
        alert("No items added to cart");
        return;
    }
    alert("Proceeding for Checkout");
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

