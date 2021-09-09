const myStorage = window.localStorage
const idStorage = window.localStorage

// let cart = []

// if (JSON.parse(myStorage.getItem('cart'))){
//     cart = JSON.parse(myStorage.getItem('cart'))
// }

// function to show products 
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
                                        <div class="modal">
                                                <div class="modal-content">
                                                    <h2 class="modal-header">Update Animal</h2>
                                                    <form action="https://my-final-project-backend.herokuapp.com/edit-animal/${product[0]}/" class="modal-form">
                                                        <input type="text" id="animal_name" name="animal_name" placeholder="Name">
                                                        <input type="text" id="animal_type" name="animal_type" placeholder="Type">
                                                        <input type="text" id="animal_breed" name="animal_breed" placeholder="Breed">
                                                        <input type="text" id="animal_age" name="animal_age" placeholder="Age">
                                                        <input type="text" id="animal_gender" name="animal_gender" placeholder="Gender">
                                                        <input type="text" id="animal_price" name="animal_price" placeholder="Price">
                                                        <input type="text" id="animal_description" name="animal_description" placeholder="Description">
                                                        <input type="text" id="animal_image" name="animal_image" placeholder="Image Link">
                                                    </form>
                                                    <div class="buttons">
                                                    <button class="close-modal" onclick="closeModal()">Close</button>
                                                        <button type="submit" class="update-btn" onclick="updateAnimal(${product[0]})">Update</button>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class='product'>
                                            <h1 class="animal_id">${product[0]}.</h1>
                                            <h3 class="animal_name">${product[1]}</h3>
                                            <h4 class="animal_breed">${product[2]}</h4>
                                            <h5 class="animal_type">${product[3]}</h5>
                                            <h6 class="animal_age">${product[4]}</h6>
                                            <h6 class="animal_gender">${product[5]}</h6>
                                            <p class="animal_price">R ${product[6]}<p> 
                                            <p class="animal_description">${product[7]}<p>
                                            <div class="cart">
                                                <button class="btn-1" onclick="openModal(${product[0]})">Update</button>
                                                <button class="btn-2" onclick="deleteAnimal(${product[0]})">Delete</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

// funtion to open update modal
function openModal(id){
    let modalBtn = document.getElementsByClassName("btn-1")
    for(let i = 0; i < modalBtn.length; i++){
        let button = modalBtn[i]
        let modal = document.querySelector(".modal")
        let modalClose = document.querySelector(".close-modal")

        button.addEventListener('click', function(){
            modal.classList.add("update-modal-active")
        })

        modalClose.addEventListener('click', function(){
            modal.classList.remove("update-modal-active")
        })
    }
    fetch(`https://my-final-project-backend.herokuapp.com/view-animal/${id}/`)
    .then(res => res.json())
    .then(data =>{
        console.log(data['data'][0])
        idStorage.setItem('animal_id', data['data'][0])
        document.getElementById('animal_name').value= `${data['data'][1]}`
        document.getElementById('animal_breed').value= `${data['data'][2]}`
        document.getElementById('animal_type').value= `${data['data'][3]}`
        document.getElementById('animal_age').value= `${data['data'][4]}`
        document.getElementById('animal_gender').value= `${data['data'][5]}`
        document.getElementById('animal_price').value= `${data['data'][6]}`
        document.getElementById('animal_description').value= `${data['data'][7]}`
        document.getElementById('animal_image').value= `${data['data'][8]}`
        console.log(`${data['data'][6]}`, `${data['data'][7]}`)
    })  
}


// function to close modal
function closeModal() {
    let modal = document.querySelector(".modal")
    let modalClose = document.querySelector(".close-modal")

    modalClose.addEventListener('click', function(){
        modal.classList.remove('update-modal-active')
        // document.querySelectorAll('.users').forEach(product => product.style.zIndex = 0)
    })
}

// function to update animal
function updateAnimal(){
    // let userID = document.querySelector("#user_number").value
    // console.log(animalID)
    fetch(`https://my-final-project-backend.herokuapp.com/edit-animal/${idStorage.getItem('animal_id')}/`, {
        method: 'PUT',
        body: JSON.stringify({
            // "animal_id": document.getElementById("animal_id").value,ß
            "animal_name": document.getElementById("animal_name").value,
            "animal_type": document.getElementById("animal_type").value,
            "animal_breed": document.getElementById("animal_breed").value,
            "animal_age": document.getElementById("animal_age").value,
            "animal_gender": document.getElementById("animal_gender").value,
            "animal_price": document.getElementById("animal_price").value,
            "animal_description": document.getElementById("animal_description").value,
            "animal_image": document.getElementById("animal_image").value,
            
        }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Animal updated successfully.")
        window.location.reload()
    })
        
}

// function to delete animal
function deleteAnimal(animalID){
    fetch(`https://my-final-project-backend.herokuapp.com/delete-animal/${animalID}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Animal deleted successfully.")
        window.location.reload()
    })
}

//function to open add modal
let modalAddBtn = document.querySelector(".create-product")
let addModal = document.querySelector(".add-modal")
let modalAddClose = document.querySelector(".add-close-modal")

modalAddBtn.addEventListener('click', function(){
    addModal.classList.add("add-modal-active")
    document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = -1)
})

modalAddClose.addEventListener('click', function(){
    addModal.classList.remove("add-modal-active")
    document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = 'initial')
})

// function to open add modal in mobile responsiveness 
let modalAddBtn2 = document.querySelector(".create-product2")
let addModal2 = document.querySelector(".add-modal")
let modalAddClose2 = document.querySelector(".add-close-modal")

modalAddBtn2.addEventListener('click', function(){
    addModal2.classList.add("add-modal-active")
    document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = -1)
    document.querySelector('#sideNavbar').style.visibility = 'hidden'
})

modalAddClose2.addEventListener('click', function(){
    addModal2.classList.remove("add-modal-active")
    document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = 'initial')
    document.querySelector('#sideNavbar').style.visibility = 'initial'
})

// function to add an animal for adoption 
function addAdoption(){
    fetch('https://my-final-project-backend.herokuapp.com/add-animal/', {
        method: 'POST',
        body: JSON.stringify({
            "animal_name": document.getElementById("add-animal_name").value,
            "animal_type": document.getElementById("add-animal_type").value,
            "animal_breed": document.getElementById("add-animal_breed").value,
            "animal_age": document.getElementById("add-animal_age").value,
            "animal_gender": document.getElementById("add-animal_gender").value,
            "animal_price": document.getElementById("add-animal_price").value,
            "animal_description": document.getElementById("add-animal_description").value,
            "animal_image": document.getElementById("add-animal_image").value,
            
        }),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Adoption Animal added successfully.")
        window.location.reload()
    })
        
}