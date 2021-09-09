const fosterStorage = window.localStorage

let itemId = fosterStorage.getItem('id')
let basket = JSON.parse(fosterStorage.getItem('foster-basket'))

function createBasket() {
    console.log(basket)
    let basketContainer = document.querySelector('#foster-checkout-container')
    basketContainer.innerHTML = ''
    basket.forEach(product => {
        basketContainer.innerHTML += `<div class = 'foster-basketProduct'>
                                <img src="${product['image']}" class="foster-basketProduct_image">
                                <div class="foster-basketProduct_info"> 
                                    <h1 class="foster-basketProduct_id">${product['id']}.</h1>
                                    <h4 class="foster-basketProduct_title">${product['name']}</h4>
                                </div>
                                <p class="foster-basketProduct_age">${product['age']}<p> 
                                <div class="foster-remove-btn"> 
                                    <button class="foster-removeProduct" id='${product['name']}' >Remove</button>
                                </div>
                                </div>`;               
    });
    // document.querySelectorAll('.basketProduct-quantity-input').forEach(counter => {console.log(counter); counter.addEventListener('change', quantityChange)});
    document.querySelectorAll('.foster-removeProduct').forEach( button => button.addEventListener('click', fosterRemoveItem))
    // basketTotal()
}
createBasket()
    
// function to remove item from basket
    function fosterRemoveItem(e){
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
                fosterStorage['foster-basket'] = JSON.stringify(basket)
                console.log(fosterStorage.getItem('foster-basket'))
                createBasket()
            }
        }
        if ((fosterStorage.getItem('foster-basket')).length > 0){
            window.location.href = "foster_page.html"
        }
        
    }


// function to checkout - Foster
function fosterCheckout(){
    fetch(`https://my-final-project-backend.herokuapp.com/foster-checkout/`, {
        method: 'POST',
        body: JSON.stringify({
            'email_address': idStorage.getItem('email_address'),
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