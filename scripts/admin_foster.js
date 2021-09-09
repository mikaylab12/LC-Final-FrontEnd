const myStorage = window.localStorage
const idStorage = window.localStorage

let cart = []

if (JSON.parse(myStorage.getItem('cart'))){
    cart = JSON.parse(myStorage.getItem('cart'))
}

// function to show products 
fetch('https://my-final-project-backend.herokuapp.com/show-foster/')
.then(res => res.json())
.then(data =>{
    console.log(data)


    let productContainer = document.querySelector('#card-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` <div class="one-preview">
                                        <div class='preview_image'>
                                            <img src="${product[7]}" class="animal_image">
                                        </div>
                                        <div class="modal">
                                                <div class="modal-content">
                                                    <h2 class="modal-header">Update Animal</h2>
                                                    <form action="https://my-final-project-backend.herokuapp.com/edit-animal/${product[0]}/" class="modal-form">
                                                        <input type="text" id="foster_name" name="foster_name" placeholder="Name">
                                                        <input type="text" id="foster_breed" name="foster_breed" placeholder="Breed">
                                                        <input type="text" id="foster_type" name="foster_type" placeholder="Type">
                                                        <input type="text" id="foster_age" name="foster_age" placeholder="Age">
                                                        <input type="text" id="foster_gender" name="foster_gender" placeholder="Gender">
                                                        <input type="text" id="foster_description" name="foster_description" placeholder="Dscription">
                                                        <input type="text" id="foster_image" name="foster_image" placeholder="Price">
                                                    </form>
                                                    <div class="modal-buttons">
                                                        <button class="close-modal" onclick="closeModal()">Close</button>
                                                        <button type="submit" class="update-btn" onclick="updateAnimal(${product[0]})">Update</button>
                                                    </div>
                                            </div>
                                        </div>
                                        <div class='product'>
                                            <h1 class="foster_id">${product[0]}.</h1>
                                            <h3 class="foster_name">${product[1]}</h3>
                                            <h4 class="foster_breed">${product[2]}</h4>
                                            <h5 class="foster_type">${product[3]}</h5>
                                            <h6 class="foster_age">${product[4]}</h6>
                                            <h6 class="foster_gender">${product[5]}</h6>
                                            <p class="foster_description">${product[6]}<p>
                                            <div class="buttons">
                                                <button class="btn-1" onclick="openModal(${product[0]})">Update</button>
                                                <button class="btn-2" onclick="deleteAnimal(${product[0]})">Delete</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

// function to filter 

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
    fetch(`https://my-final-project-backend.herokuapp.com/view-foster/${id}/`)
    .then(res => res.json())
    .then(data =>{
        console.log(data['data'][0])
        idStorage.setItem('foster_id', data['data'][0])
        document.getElementById('foster_name').value= `${data['data'][1]}`
        document.getElementById('foster_breed').value= `${data['data'][2]}`
        document.getElementById('foster_type').value= `${data['data'][3]}`
        document.getElementById('foster_age').value= `${data['data'][4]}`
        document.getElementById('foster_gender').value= `${data['data'][5]}`
        // document.getElementById('animal_price').value= `${data['data'][6]}`
        document.getElementById('foster_description').value= `${data['data'][6]}`
        document.getElementById('foster_image').value= `${data['data'][7]}`
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
    fetch(`https://my-final-project-backend.herokuapp.com/edit-foster/${idStorage.getItem('foster_id')}/`, {
        method: 'PUT',
        body: JSON.stringify({
            // "foster_id": document.getElementById("foster_id").value,
            "foster_name": document.getElementById("foster_name").value,
            "foster_breed": document.getElementById("foster_breed").value,
            "foster_type": document.getElementById("foster_type").value,
            "foster_age": document.getElementById("foster_age").value,
            "foster_gender": document.getElementById("foster_gender").value,
            // "foster_price": document.getElementById("foster_price").value,
            "foster_description": document.getElementById("foster_description").value,
            "foster_image": document.getElementById("foster_image").value,
            
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
    fetch(`https://my-final-project-backend.herokuapp.com/delete-foster/${animalID}`, {
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

// function to open add modal
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
    
// function to add foster animal to website
function addFoster(){
    fetch('https://my-final-project-backend.herokuapp.com/add-foster/', {
        method: 'POST',
        body: JSON.stringify({
            "foster_name": document.getElementById("add-foster_name").value,
            "foster_type": document.getElementById("add-foster_type").value,
            "foster_breed": document.getElementById("add-foster_breed").value,
            "foster_age": document.getElementById("add-foster_age").value,
            "foster_gender": document.getElementById("add-foster_gender").value,
            "foster_description": document.getElementById("add-foster_description").value,
            "foster_image": document.getElementById("add-foster_image").value,
        }),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Foster Animal added successfully.")
        window.location.reload()
    })
        
}


