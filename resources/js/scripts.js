import data from './data.js'
//-------------------------------------------
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
//-------------------------------------------
// Handle Change events on update input
itemList.onchange = function(e){
    if (e.target && e.target.classList.contains('update')){
        //console.log(e.target)
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}
//-------------------------------------------
// Clicks on the list
itemList.onclick = function(e) {
    //console.log("clicked list!!")
    //console.log(e.target)
    if (e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name 
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')){
        const name = e.target.dataset.name 
        addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')){
        const name = e.target.dataset.name 
        removeItem(name, 1)
    }
}
//-------------------------------------------
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)

    //makes a paragraph
    let desc = document.createElement('P')
    //give the paragra text from our json data file
    desc.innerText =data[i].desc
    //slaps this onto our newDiv
    newDiv.appendChild(desc)
    //this is the same thing but for price
    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
}
//-------------------------------------------
const all_items_button = Array.from(document.querySelectorAll('button'))
console.log(all_items_button)
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
//-------------------------------------------
const cart = []
//-------------------------------------------
// Add Item
function addItem(name, price) {
    for (let i = 0; i <cart.length; i += 1){
        if (cart[i].name === name){
            cart[i].qty +=1
            showItems()
            return
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item)
}
//-------------------------------------------
// Show Items
function showItems() {
    const qty = getQty()
    //console.log(`You have ${getQty()} item(s) in your cart`) 
    cartQty.innerHTML = `You have ${getQty()} item(s) in your cart`

    let itemStr = ''
    for(let i = 0; i < cart.length; i+= 1){
        //console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty} `)
        const { name, price, qty } = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = ${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Total in cart is $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart is $${getTotal()}`
}
//-------------------------------------------
//Get Qty
function getQty() {
    let qty = 0
    for (let i = 0; i <cart.length; i += 1){
        qty += cart[i].qty
    }
    return qty
}
//-------------------------------------------
//Get Total
function getTotal(){
    let total = 0
    for (let i = 0; i < cart.length; i += 1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
 }
 //-------------------------------------------
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name){
            if (qty > 0){
            cart[i].qty -= 1
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice (i, 1)
            }
        showItems()
        return
        }
    }
}
//-------------------------------------------
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1){
        if (cart[i].name === name){
            if (qty < 1){
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}
//-------------------------------------------
console.log(itemList)
showItems()