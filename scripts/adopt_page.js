const myStorage = window.localStorage
const idStorage = window.localStorage

let basket = []

if (JSON.parse(myStorage.getItem('basket'))){
    basket = JSON.parse(myStorage.getItem('basket'))
}

// function to show products 
fetch('https://my-final-project-backend.herokuapp.com/show-animals/')
.then(res => res.json())
.then(data =>{
    console.log(data)


    let productContainer = document.querySelector('#card-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` <div class="one-preview"  techStack='${product[2]}'>
                                        <div class='preview_image'>
                                            <img src="${product[8]}" class="animal_image">
                                        </div>
                                        <div class='product'>
                                            <h1 class="animal_id">${product[0]}.</h1>
                                            <h3 class="animal_name">${product[1]}</h3>
                                            <h4 class="animal_type">${product[2]}</h4>
                                            <h5 class="animal_breed">${product[3]}</h5>
                                            <h6 class="animal_age">${product[4]}</h6>
                                            <h6 class="animal_gender">${product[5]}</h6>
                                            <p class="animal_price">R ${product[6]}<p> 
                                            <p class="animal_description">${product[7]}<p>
                                            <div class="basket">
                                                <button class="btn-basket1" onclick="addToBasket(${product[0]})">Adopt</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

// function to filter 


// function to add to basket
function addToBasket(id){
    let object = {}
    console.log(id)
    fetch(`https://my-final-project-backend.herokuapp.com/view-animal/${id}`, {
        headers: {
            // 'Authorization': `jwt ${mystorage.getItem('jwt-token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        object['id'] = data['data'][0];
        object['type'] = data['data'][3];
        object['breed'] = data['data'][2];
        object['image'] = data['data'][8];
        object['name'] = data['data'][1];
        object['price'] = data['data'][6]
        // object['quantity'] = parseInt(quantity);
        // object['totalprice'] =  parseInt(data['data'][0][2]);
        console.log(object);
        for (let item in basket){
            console.log(item)
            if (object['name'] == basket[item]['name']){
                basket[item]['quantity'] += object['quantity'];
                basket[item]['totalprice'] += object['totalprice'];
                console.log(basket)
                myStorage.setItem('basket', JSON.stringify(basket))
                idStorage.setItem('id', data['data'][0])
                alert('Basket has been updated')
                return
            };
        }    
        basket = basket.concat(object)
        console.log(basket)
        myStorage.setItem('basket', JSON.stringify(basket))
        alert('Item added to basket successfully')
    })
}


function filterAnimals(category) {
    let animals = document.getElementsByClassName("one-preview");
    let allButton = document.querySelector(".all")
    const websiteGreen = '#307473';
    if (category == "All") {
      for (animal of animals) {
        animal.style.display = "flex";
        allButton.style.color = "white";
        allButton.style.backgroundColor = websiteGreen;
      }
      return;
    }
    for (animal of animals) {
      console.log(animal);
      animal.style.display = "none";
      allButton.style.color= websiteGreen;
      allButton.style.backgroundColor = "transparent";
      allButton.onMouseOver="this.style.color='white'";
      allButton.onMouseOut="this.style.color='white'";
      allButton.onMouseOver="this.style.backgroundColor='#307473'";
      allButton.onMouseOut="this.style.backgroundColor='transparent'";
      
                        // onMouseOut="this.style.color='#307473'";
                        // onMouseOver="this.style.backgroundColor='#307473'";
                        

    }
    
    let selectedAnimals = document.querySelectorAll(`[techStack='${category}']`);
  
    for (animal of selectedAnimals) {
        animal.style.display = "flex";
        allButton.style.color = websiteGreen;
        allButton.style.backgroundColor = "transparent";
        allButton.onMouseOver=".style.color='transparent'";
        allButton.onMouseOver="this.style.backgroundColor='websiteGreen'";
    }
  }