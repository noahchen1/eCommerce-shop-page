if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready ()
    scrollToTop()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('cart-qty-btn')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

    var quantityInputs = document.getElementsByClassName('cart-item-qty')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.querySelector('.cart-purchase-btn').addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you!')
    var cartItems = document.querySelector('.cart-items')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
} 



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('unit-cost')[0].innerText
    var imageSrc = shopItem.querySelector('[class^="cutting-board"]')
    var imageURL = getComputedStyle(imageSrc).getPropertyValue('background-image').slice(4, -1)
    addItemToCart(title, price, imageURL)
    updateCartTotal()
}

function addItemToCart(title, price, imageURL) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('Item has been added to cart')
            return
         }
    }

    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src=${imageURL}>
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-item-price cart-price cart-column">${price}</span>
    <div class="cart-qty cart-column">
        <input class="cart-item-qty" type="number" value="1">
        <button class="btn cart-qty-btn">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-qty-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-item-qty')[0].addEventListener('change', quantityChanged)

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-item-qty')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }

    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}



/* go to top btn */

function scrollToTop() {
    var position =
        document.documentElement.scrollTop;
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        scrollAnimation = setTimeout("scrollToTop()", 6);
    } else clearTimeout(scrollAnimation);
}

