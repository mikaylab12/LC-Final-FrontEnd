const idStorage = window.localStorage

let itemId = idStorage.getItem('id')
let basket = JSON.parse(idStorage.getItem('basket'))

function createBasket() {
    console.log(basket)
    let basketContainer = document.querySelector('#checkout-container')
    basketContainer .innerHTML = ''
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
    });
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
    // let quantityInputs = document.getElementsByClassName('basketProduct-quantity-input')
    // for(let i = 0; i < quantityInputs.length; i++){
    //     let input = quantityInputs[i]
    //     input.addEventListener('change', quantityChange)
    // }
    for (let  item in basket){
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

}

// function to view user
fetch(`https://my-final-project-backend.herokuapp.com/view-profile/${id}/`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        idStorage.setItem('user_number', data['data'][0][0])
        document.getElementById('user_id').value= `${data['data'][0][1]}`
        document.getElementById('first_name').value= `${data['data'][0][2]}`
        document.getElementById('last_name').value= `${data['data'][0][3]}`
        idStorage.setItem('email_address')= `${data['data'][0][4]}`
        idStorage.setItem('contact_number')= `${data['data'][0][5]}`
        idStorage.setItem('username').value= `${data['data'][0][6]}`
        document.getElementById('password').value= `${data['data'][0][7]}`
        console.log(`${data['data'][0][6]}`, `${data['data'][0][7]}`)
    })  

// function to checkout - Adoption
function adoptionCheckout(){
    fetch(`https://my-final-project-backend.herokuapp.com/adopt-checkout/`, {
        method: 'POST',
        body: JSON.stringify({
            'email_address': idStorage['email_address'],
            // idStorage.setItem('user_number', data['data'][0][0]),
            'contact_number': idStorage.getItem('contact_number'),
            'username': idStorage.getItem('username'),
        }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Email has been sent successfully.")
        window.location.href='adopt_page.html'
        localStorage.clear()
    })
        
}