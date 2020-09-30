import data from './data.js'
const itemsContainer = document.getElementById('items')

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


const cart = []

function addItem(name, price) {
    for (let i = 0; i <cart.length; i += 1){
        if (cart[i].name === name){
            cart[i].qty +=1
            return
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item)
}
//Show Items
function showItems(){
    const qty = getQty()
    console.log(`You have ${getQty()} item(s) in your cart`) 

    for(let i = 0; i < cart.length; i+= 1){
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty} `)
    }
    //toFixed returns as string
    console.log(`Total in cart is $${getTotal()}`)
}

//Get Qty
function getQty() {
    let qty = 0
    for (let i = 0; i <cart.length; i += 1){
        qty += cart[i].qty
    }
    return qty
}

//Get total
function getTotal(){
    let total = 0
    for (let i = 0; i < cart.length; i += 1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
 }

addItem('apple', 0.99)
addItem('apple', 0.99)
addItem('pear', 0.79)
addItem('mango', 1.29)

showItems()