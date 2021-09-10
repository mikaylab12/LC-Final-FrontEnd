const idStorage = window.localStorage
const myStorage = window.localStorage

let userdata = JSON.parse(myStorage['user-details'])
let itemId = idStorage.getItem('id')
let basket = JSON.parse(idStorage.getItem('basket'))

// function to cdisplay animals added to the basket
function createBasket() {
    console.log(basket)
    let basketContainer = document.querySelector('#checkout-container')
    basketContainer .innerHTML = ''
    if (idStorage['basket'] == null){
        basketContainer .innerHTML = '<h2 class="results">There are no animals in your basket.</h2>'
    }else if (basket.length === 0){
        basketContainer .innerHTML = '<h2 class="results">There are no animals in your basket.</h2>'
    }else{
    basket.forEach(product => {
    basketContainer .innerHTML += `<div class = 'basketProduct'>
                                <img src="${product['image']}" class="basketProduct_image">
                                <div class="basketProduct_info"> 
                                    <h1 class="basketProduct_id">${product['id']}.</h1>
                                    <h4 class="basketProduct_title">${product['name']}</h4>
                                </div>
                                <p class="basketProduct_price">R ${product['price']}<p> 
                                <div class="remove-btn"> 
                                    <button class="removeProduct" id='${product['name']}' >Remove</button>
                                </div>
                                </div>`;               
    });}
    // document.querySelectorAll('.basketProduct-quantity-input').forEach(counter => {console.log(counter); counter.addEventListener('change', quantityChange)});
    document.querySelectorAll('.removeProduct').forEach( button => button.addEventListener('click', removeItem))
    basketTotal()
}
createBasket()


// function to remove item from basket
function removeItem(e){
    console.log(e.target.id)
    let itemname = e.target.id
    console.log(itemname)
    let basketContainer = document.querySelector('#checkout-container')[0]
    for (let item in basket){
        if (itemname == basket[item]['name']){
            basket.splice(item, 1)
            idStorage['basket'] = JSON.stringify(basket)
            console.log(idStorage.getItem('basket'))
            createBasket()
        }
    }
    basketTotal()
}

// function to calculate total amount
function basketTotal(){
    let basketContainer = document.querySelector('#checkout-container')[0]
    let basketRow = document.getElementsByClassName('basketProduct')
    let total = 0
    for(let i = 0; i < basketRow.length; i++){
        let row = basketRow[i]
        console.log(row)
        let priceItem = row.querySelector('.basketProduct_price')
        // let quantityItem = row.getElementsByClassName('basketProduct-quantity-input')[0]
        let price = parseFloat(priceItem.innerText.replace('R ', ''))
        // let quantity = quantityItem.value
        total = Math.round(total + (price))
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket-price')[0].innerHTML = '   R ' + total
    myStorage.setItem('total', total)
}

// function to checkout - Adoption
function adoptionCheckout(){
    fetch(`https://my-final-project-backend.herokuapp.com/adopt-checkout/`, {
        method: 'POST',
        body: JSON.stringify({
            'email_address': userdata[0][4],
            'contact_number': userdata[0][5],
            'username': userdata[0][6],
            'total_price' : myStorage.getItem('total')
        }),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("An email has been sent to you with the neccessary details!")
        idStorage.removeItem('basket')
        // console.log(idStorage)
        console.log("Basket cleared")
        window.location.href='adopt_page.html'
    })
}