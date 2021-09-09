// function to show animals for adoption 
fetch('https://my-final-project-backend.herokuapp.com/show-animals/')
.then(res => res.json())
.then(data =>{
    console.log(data)


    let productContainer = document.querySelector('#card-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` <div class="one-preview">
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
                                            <div class="cart">
                                                <button class="btn-cart1" onclick="signIn()">Adopt</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

// function to go to sign in page 
function signIn(){
    alert("Error, Please sign in before requesting to adopt or foster.")
    window.location.href='sign-in.html'
}

// function to show preview of thse available for fostering  
fetch('https://my-final-project-backend.herokuapp.com/show-foster/')
.then(res => res.json())
.then(data =>{
    console.log(data)


    let productContainer = document.querySelector('#foster-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` 
                                        <div class="one-preview2">
                                            <div class='preview_image'>
                                                <img src="${product[7]}" class="foster_image">
                                            </div>

                                            <div class='foster_product'>
                                                <h1 class="foster_id">${product[0]}.</h1>
                                                <h3 class="foster_name">${product[1]}</h3>
                                                <h4 class="foster_breed">${product[2]}</h4>
                                                <h5 class="foster_type">${product[3]}</h5>
                                                <h6 class="foster_age">${product[4]}</h6>
                                                <h6 class="foster_gender">${product[5]}</h6>
                                                <p class="foster_description">${product[6]}<p>
                                                <div class="cart">
                                                    <button class="btn-cart2" onclick="signIn()">Foster</button>
                                                </div>
                                            </div>
                                        </div>`
})
})