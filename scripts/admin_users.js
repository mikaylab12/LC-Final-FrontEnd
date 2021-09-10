const idStorage = window.localStorage
const myStorage = window.localStorage
let users = []
let admins = []
// let cart = []

// function to show users
fetch('https://my-final-project-backend.herokuapp.com/show-users/')
.then(res => res.json())
.then(data =>{
    console.log(data)
    users = data.data


    let productContainer = document.querySelector('#users-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` <div class="users-preview">
                                        <div class='preview'>
                                            <h2 class="user_number_preview">${product[0]}.</h2>
                                            <div class="fullname"> 
                                                <h3 class="first_name">${product[2]}</h3>
                                                <h3 class="last_name">${product[3]}</h3>
                                            </div>
                                            <h4 class="username">${product[6]}</h4>
                                        </div>
                                        <div class="modal">
                                                <div class="modal-content">
                                                    <h2 class="modal-header">Update User</h2>
                                                    <form action="https://my-final-project-backend.herokuapp.com/edit-user/${product[0]}/" class="modal-form">
                                                        <input type="text" id="user_id-${product[0]}" name="user_id" placeholder="ID">
                                                        <input type="text" id="first_name-${product[0]}" name="first_name" placeholder="Name">
                                                        <input type="text" id="last_name-${product[0]}" name="last_name" placeholder="Surname">
                                                        <input type="text" id="email_address-${product[0]}" name="email_address" placeholder="Email">
                                                        <input type="text" id="contact_number-${product[0]}" name="contact_number" placeholder="Contact">
                                                        <input type="text" id="username-${product[0]}" name="username" placeholder="Username">
                                                        <input type="text" id="password-${product[0]}" name="password" placeholder="Password">
                                                    </form>
                                                    <div class="modal-buttons">
                                                    <button class="close-modal" onclick="closeModal()">Close</button>
                                                        <button type="submit" class="update-btn" onclick="updateUser(${product[0]})">Update</button>
                                                    </div>
                                                </div>
                                            </div>

                                        <div class='users'>
                                            <h2 class="user_number">${product[0]}.</h2>
                                            <h2 class="user_id">ID Number: ${product[1]}</h2>
                                            <h3 class="email_address">Email: ${product[4]}</h3>
                                            <h4 class="contact_number">Number: ${product[5]}</h4>
                                            <h5 class="password">Password: ${product[7]}</h5>
                                            <div class="buttons">
                                                <button class="btn-1" onclick="openModal(${product[0]})">Update</button>
                                                
                                                <button class="btn-2" onclick="deleteUser(${product[0]})">Delete</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

// function to open update modal
function openModal(id){
    myStorage.setItem('user-number', id)
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
    fetch(`https://my-final-project-backend.herokuapp.com/view-profile/${myStorage.getItem('user-number')}/`)
    .then(res => res.json())
    .then(data =>{
        console.log(data['data'][0][0])
        console.log(data);
        myStorage.setItem('user_number', `${data['data'][0][0]}`)
        document.getElementById(`user_id-${data['data'][0][0]}`).value= data['data'][0][1]
        document.getElementById(`first_name-${data['data'][0][0]}`).value= data['data'][0][2]
        document.getElementById(`last_name-${data['data'][0][0]}`).value= data['data'][0][3]
        document.getElementById(`email_address-${data['data'][0][0]}`).value= data['data'][0][4]
        document.getElementById(`contact_number-${data['data'][0][0]}`).value= data['data'][0][5]
        document.getElementById(`username-${data['data'][0][0]}`).value= data['data'][0][6]
        document.getElementById(`password-${data['data'][0][0]}`).value= data['data'][0][7]
        console.log(`${data['data'][0][6]}`, `${data['data'][0][7]}`)
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

// function to update user
function updateUser(){
    // let userID = document.querySelector("#user_number").value
    // console.log(userID)
    fetch(`https://my-final-project-backend.herokuapp.com/edit-user/${myStorage.getItem('user-number')}/`, {
        method: 'PUT',
        body: JSON.stringify({
            "user_id": document.getElementById(`user_id-${myStorage.getItem('user-number')}`).value,
            "first_name": document.getElementById(`first_name-${myStorage.getItem('user-number')}`).value,
            "last_name": document.getElementById(`last_name-${myStorage.getItem('user-number')}`).value,
            "email_address": document.getElementById(`email_address-${myStorage.getItem('user-number')}`).value,
            "contact_number": document.getElementById(`contact_number-${myStorage.getItem('user-number')}`).value,
            "username": document.getElementById(`username-${myStorage.getItem('user-number')}`).value,
            "password": document.getElementById(`password-${myStorage.getItem('user-number')}`).value,
        }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(myStorage.getItem('user-number'))
        console.log(res);
        alert("User updated successfully.")
        window.location.reload()
    })
        
}

// function to delete user
function deleteUser(userID){
    // console.log(id)
    // let userID = document.querySelector("#delUser-id").value
    fetch(`https://my-final-project-backend.herokuapp.com/delete-user/${userID}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("User deleted successfully.")
        window.location.reload()
    })
}

// Admin User 

// function to show products 
fetch('https://my-final-project-backend.herokuapp.com/show-admin/')
.then(res => res.json())
.then(data =>{
    console.log(data)
    admins = data.data

    let productContainer = document.querySelector('#admin-container')
    productContainer.innerHTML = "";
    data['data'].forEach(product => {
        productContainer.innerHTML += ` <div class="admin">
                                        <div class='admin_preview'>
                                            <h2 class="admin_number_preview">${product[0]}.</h2>
                                            <div class="admin-fullname"> 
                                                <h3 class="admin_first_name">${product[2]}</h3>
                                                <h3 class="admin_last_name">${product[3]}</h3>
                                            </div>
                                            <h4 class="admin_username">${product[6]}</h4>
                                        </div>
                                        <div class="admin-modal">
                                                <div class="admin-modal-content">
                                                    <h2 class="admin-modal-header">Update Admin</h2>
                                                    <form action="https://my-final-project-backend.herokuapp.com/edit-admin/${product[0]}/" class="admin-modal-form">
                                                        <input type="text" id="admin_id-${product[0]}" name="admin_id" placeholder="ID">
                                                        <input type="text" id="admin_name-${product[0]}" name="admin_name" placeholder="Name">
                                                        <input type="text" id="admin_surname-${product[0]}" name="admin_surname" placeholder="Surname">
                                                        <input type="text" id="admin_email-${product[0]}" name="admin_email" placeholder="Email">
                                                        <input type="text" id="admin_contact-${product[0]}" name="admin_contact" placeholder="Contact">
                                                        <input type="text" id="admin_username-${product[0]}" name="admin_username" placeholder="Username">
                                                        <input type="text" id="admin_password-${product[0]}" name="admin_password" placeholder="Password">
                                                    </form>
                                                    <div class="buttons">
                                                    <button class="admin-close-modal" onclick="closeAdminModal()">Close</button>
                                                        <button type="submit" class="admin-update-btn" onclick="updateAdminUser(${product[0]})">Update</button>
                                                    </div>
                                                </div>
                                            </div>

                                        <div class='admin-users'>
                                            <h2 class="admin_number">${product[0]}.</h2>
                                            <h2 class="admin_id">ID Number: ${product[1]}</h2>
                                            <h3 class="admin_email">Email: ${product[4]}</h3>
                                            <h4 class="admin_contact">Number: ${product[5]}</h4>
                                            <h5 class="admin_password">Password: ${product[7]}</h5>
                                            <div class="buttons">
                                                <button class="admin-btn-1" onclick="openAdminModal(${product[0]})">Update</button>
                                                
                                                <button class="admin-btn-2" onclick="deleteAdminUser(${product[0]})">Delete</button>
                                            </div>
                                        </div>
                                        </div>`
})
})

function openAdminModal(adminID){
    let modalAdminBtn = document.getElementsByClassName("admin-btn-1")
    for(let i = 0; i < modalAdminBtn.length; i++){
        let adminButton = modalAdminBtn[i]
        let adminModal = document.querySelector(".admin-modal")
        let adminModalClose = document.querySelector(".admin-close-modal")

        adminButton.addEventListener('click', function(){
            adminModal.classList.add("admin-update-modal-active")
        })

        adminModalClose.addEventListener('click', function(){
            adminModal.classList.remove("admin-update-modal-active")
        })
    }
    fetch(`https://my-final-project-backend.herokuapp.com/view-admin/${adminID}/`)
    .then(res => res.json())
    .then(data =>{
        console.log(data['data'][0])
        idStorage.setItem('admin_number', data['data'][0])
        document.getElementById(`admin_id-${data['data'][0]}`).value= data['data'][1]
        document.getElementById(`admin_name-${data['data'][0]}`).value= data['data'][2]
        document.getElementById(`admin_surname-${data['data'][0]}`).value= data['data'][3]
        document.getElementById(`admin_email-${data['data'][0]}`).value= data['data'][4]
        document.getElementById(`admin_contact-${data['data'][0]}`).value= data['data'][5]
        document.getElementById(`admin_username-${data['data'][0]}`).value= data['data'][6]
        document.getElementById(`admin_password-${data['data'][0]}`).value= data['data'][7]
        console.log(`${data['data'][6]}`, `${data['data'][7]}`)
    })  
}


// function to close modal
function closeAdminModal() {
    let adminModal = document.querySelector(".admin-modal")
    let adminModalClose = document.querySelector(".admin-close-modal")

    adminModalClose.addEventListener('click', function(){
        adminModal.classList.remove('admin-update-modal-active')
        // document.querySelectorAll('.users').forEach(product => product.style.zIndex = 0)
    })
}

// function to update admin user
function updateAdminUser(){
    // let userID = document.querySelector("#user_number").value
    // console.log(userID)
    fetch(`https://my-final-project-backend.herokuapp.com/edit-admin/${myStorage.getItem('admin_number')}/`, {
        method: 'PUT',
        body: JSON.stringify({
            "admin_id": document.getElementById(`admin_id-${myStorage.getItem('admin_number')}`).value,
            "admin_name": document.getElementById(`admin_name-${myStorage.getItem('admin_number')}`).value,
            "admin_surname": document.getElementById(`admin_surname-${myStorage.getItem('admin_number')}`).value,
            "admin_email": document.getElementById(`admin_email-${myStorage.getItem('admin_number')}`).value,
            "admin_contact": document.getElementById(`admin_contact-${myStorage.getItem('admin_number')}`).value,
            "admin_username": document.getElementById(`admin_username-${myStorage.getItem('admin_number')}`).value,
            "admin_password": document.getElementById(`admin_password-${myStorage.getItem('admin_number')}`).value,
            
        }),
        headers: {
            'Content-Type' : 'application/json',
            // 'Authorization' : `jwt ${myStorage.getItem('jwt-token')}`
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Admin user updated successfully.")
        window.location.reload()
    })
        
}

// function to delete admin user
function deleteAdminUser(adminID){
    fetch(`https://my-final-project-backend.herokuapp.com/delete-admin/${adminID}`, {
        method: 'GET',
        body: JSON.stringify(),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        alert("Admin user deleted successfully.")
        window.location.reload()
    })
};

// function to open add modal in mobile responsiveness 
// let modalAddBtn2 = document.querySelector(".create-product2")
// let addModal2 = document.querySelector(".add-modal")
// let modalAddClose2 = document.querySelector(".add-close-modal")

// modalAddBtn2.addEventListener('click', function(){
//     addModal2.classList.add("add-modal-active")
//     document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = -1)
//     document.querySelector('#sideNavbar').style.visibility = 'hidden'
// })

// modalAddClose2.addEventListener('click', function(){
//     addModal2.classList.remove("add-modal-active")
//     document.querySelectorAll('.one-preview').forEach(product => product.style.zIndex = 'initial')
//     document.querySelector('#sideNavbar').style.visibility = 'initial'
// })

// search function
function searchUsers() {
    let searchTerm = document.querySelector("#search").value;
    let container = document.querySelector("#users-container")
    console.log(searchTerm);
    let searchedUsers = users.filter((user) =>
        user[2].toLowerCase().includes(searchTerm.toLowerCase()),
    );
    console.log(searchedUsers);
    if (searchedUsers.length === 0 ){
        // console.log('test')
        container.innerHTML = ''
        container.innerHTML += `<h2 class="results">There were no users that matched your search.</h2>`
    }else{
    container.innerHTML = ''
    searchedUsers.forEach((user) => {
        container.innerHTML += ` <div class="users-preview">
        <div class='preview'>
            <h2 class="user_number_preview">${user[0]}.</h2>
            <div class="fullname"> 
                <h3 class="first_name">${user[2]}</h3>
                <h3 class="last_name">${user[3]}</h3>
            </div>
            <h4 class="username">${user[6]}</h4>
        </div>
        <div class="modal">
                <div class="modal-content">
                    <h2 class="modal-header">Update User</h2>
                    <form action="https://my-final-project-backend.herokuapp.com/edit-user/${user[0]}/" class="modal-form">
                        <input type="text" id="user_id" name="user_id" placeholder="ID">
                        <input type="text" id="first_name" name="first_name" placeholder="Name">
                        <input type="text" id="last_name" name="last_name" placeholder="Surname">
                        <input type="text" id="email_address" name="email_address" placeholder="Email">
                        <input type="text" id="contact_number" name="contact_number" placeholder="Contact">
                        <input type="text" id="username" name="username" placeholder="Username">
                        <input type="text" id="password" name="password" placeholder="Password">
                    </form>
                    <div class="buttons">
                    <button class="close-modal" onclick="closeModal()">Close</button>
                        <button type="submit" class="update-btn" onclick="updateUser(${user[0]})">Update</button>
                    </div>
                </div>
            </div>

        <div class='users'>
            <h2 class="user_number">${user[0]}.</h2>
            <h2 class="user_id">ID Number: ${user[1]}</h2>
            <h3 class="email_address">Email: ${user[4]}</h3>
            <h4 class="contact_number">Number: ${user[5]}</h4>
            <h5 class="password">Password: ${user[7]}</h5>
            <div class="buttons">
                <button class="btn-1" onclick="openModal(${user[0]})">Update</button>
                
                <button class="btn-2" onclick="deleteUser(${user[0]})">Delete</button>
            </div>
        </div>
        </div>`
        console.log(user)
})}
}

function searchAdminUsers() {
    let searchAdmin = document.querySelector("#admin-search").value;
    let adminContainer = document.querySelector("#admin-container")
    console.log(searchAdmin);
    let searchedAdmin = admins.filter((admin) =>
        admin[2].toLowerCase().includes(searchAdmin.toLowerCase()),
    );
    console.log(searchedAdmin);
    if (searchedAdmin.length === 0 ){
        // console.log('test')
        adminContainer.innerHTML = ''
        adminContainer.innerHTML += `<h2 class="results">There were no admin users that matched your search.</h2>`
    }else{
        // console.log('test 2')
        adminContainer.innerHTML = ''
        searchedAdmin.forEach((admin) => {
            adminContainer.innerHTML +=  ` <div class="admin">
            <div class='admin_preview'>
                <h2 class="admin_number_preview">${admin[0]}.</h2>
                <div class="admin-fullname"> 
                    <h3 class="admin_first_name">${admin[2]}</h3>
                    <h3 class="admin_last_name">${admin[3]}</h3>
                </div>
                <h4 class="admin_username">${admin[6]}</h4>
            </div>
            <div class="admin-modal">
                    <div class="admin-modal-content">
                        <h2 class="admin-modal-header">Update Admin</h2>
                        <form action="https://my-final-project-backend.herokuapp.com/edit-admin/${admin[0]}/" class="admin-modal-form">
                            <input type="text" id="admin-id" name="admin-id" placeholder="ID">
                            <input type="text" id="admin-name" name="admin-name" placeholder="Name">
                            <input type="text" id="admin-surname" name="admin-surname" placeholder="Surname">
                            <input type="text" id="admin-email" name="admin-semail" placeholder="Email">
                            <input type="text" id="admin-contact" name="admin-contact" placeholder="Contact">
                            <input type="text" id="admin-username" name="admin-username" placeholder="Username">
                            <input type="text" id="admin-password" name="admin-password" placeholder="Password">
                        </form>
                        <div class="buttons">
                        <button class="admin-close-modal" onclick="closeAdminModal()">Close</button>
                            <button type="submit" class="admin-update-btn" onclick="updateAdminUser(${admin[0]})">Update</button>
                        </div>
                    </div>
                </div>
    
            <div class='admin-users'>
                <h2 class="admin_number">${admin[0]}.</h2>
                <h2 class="admin_id">ID Number: ${admin[1]}</h2>
                <h3 class="admin_email">Email: ${admin[4]}</h3>
                <h4 class="admin_contact">Number: ${admin[5]}</h4>
                <h5 class="admin_password">Password: ${admin[7]}</h5>
                <div class="buttons">
                    <button class="admin-btn-1" onclick="openAdminModal(${admin[0]})">Update</button>
                    
                    <button class="admin-btn-2" onclick="deleteAdminUser(${admin[0]})">Delete</button>
                </div>
            </div>
            </div>`
            // console.log(admin)
    })}
}