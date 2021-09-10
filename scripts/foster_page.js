const myStorage = window.localStorage
const fosterStorage = window.localStorage

let fosterBasket = []

if (JSON.parse(myStorage.getItem('foster-basket'))){
    fosterBasket = JSON.parse(myStorage.getItem('foster-basket'))

}

// function to show preview of those available for fostering  
fetch('https://my-final-project-backend.herokuapp.com/show-foster/')
.then(res => res.json())
.then(data =>{
    console.log(data)
    fosterStorage.setItem('animal-name' , data.data[0][1])
    fosterStorage.setItem('animal-type' , data.data[0][2])
    fosterStorage.setItem('animal-breed' , data.data[0][3])
    fosterStorage.setItem('animal-age' , data.data[0][4])

    let productContainer = document.querySelector('#foster-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` 
                                        <div class="one-preview2" techStack='${product[2]}'>
                                            <div class='preview_image'>
                                                <img src="${product[7]}" class="foster_image">
                                            </div>

                                            <div class='foster_product'>
                                                <h1 class="foster_id">${product[0]}.</h1>
                                                <h3 class="foster_name">${product[1]}</h3>
                                                <h4 class="foster_type">${product[2]}</h4>
                                                <h5 class="foster_breed">${product[3]}</h5>
                                                <h6 class="foster_age">${product[4]}</h6>
                                                <h6 class="foster_gender">${product[5]}</h6>
                                                <p class="foster_description">${product[6]}<p>
                                                <div class="foster-basket">
                                                    <button class="btn-basket1" onclick="fosterAddToBasket(${product[0]})">Foster</button>
                                                </div>
                                            </div>
                                        </div>`
})
})

// function to add to basket
function fosterAddToBasket(id){
    let object = {}
    console.log(id)
    fetch(`https://my-final-project-backend.herokuapp.com/view-foster/${id}/`, {
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
        object['image'] = data['data'][7];
        object['name'] = data['data'][1];
        object['age'] = data['data'][4]
        console.log(object);
        for (let item in fosterBasket){
            console.log(item)
            if (object['name'] == fosterBasket[item]['name']){
                console.log(fosterBasket)
                myStorage.setItem('foster-basket', JSON.stringify(fosterBasket))
                fosterStorage.setItem('id', data['data'][0])
                alert('Foster basket has been updated')
                window.location.href = "foster_basket.html"
            };
        }    
        fosterBasket = fosterBasket.concat(object)
        console.log(fosterBasket)
        myStorage.setItem('foster-basket', JSON.stringify(fosterBasket))
        alert('Animal added to basket successfully')
        window.location.href = "foster_basket.html"
    })
}


// function to filter animals
function filterAnimals(category) {
    let animals = document.getElementsByClassName("one-preview2");
    let allButton = document.querySelector(".all")
    const websiteGreen = '#6DB2A2';
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
      allButton.onMouseOver="this.style.backgroundColor='#6DB2A2'";
      allButton.onMouseOut="this.style.backgroundColor='transparent'";
    }
    
    let selectedAnimals = document.querySelectorAll(`[techStack='${category}']`);
  
    for (animal of selectedAnimals) {
        animal.style.display = "flex";
        allButton.style.color = websiteGreen;
        allButton.style.backgroundColor = "transparent";
        allButton.onMouseOver="this.style.color='white'";
        allButton.onMouseOut="this.style.color='white'";
        allButton.onMouseOver="this.style.backgroundColor= websiteGreen";
        allButton.onMouseOut="this.style.backgroundColor='transparent'";
    }}