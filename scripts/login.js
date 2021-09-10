// Login Function for users 
let entry_token = window.localStorage.getItem("jwt-token")
let form = document.getElementById('form')

form.addEventListener("submit", function (event){
    event.preventDefault()
    fetch('https://my-final-project-backend.herokuapp.com/login/', {
    method: "POST",
    body: JSON.stringify({
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        myStorage = window.localStorage
        // console.log(data['entry__token'])
        myStorage.setItem('jwt-token', data['entry__token'])
        if (data['message'] == "Please enter valid credentials."){
            alert("Error, This is not a valid login in!")
        }
        else{
            fetch(`https://my-final-project-backend.herokuapp.com/user-profile/${username}/${password}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                idStorage.setItem('user_number', data['data'][0][0])
                document.getElementById('user_id').value= `${data['data'][0][1]}`
                document.getElementById('first_name').value= `${data['data'][0][2]}`
                document.getElementById('last_name').value= `${data['data'][0][3]}`
                idStorage.setItem('email_address', data['data'][0][4])
                idStorage.setItem('contact_number')= `${data['data'][0][5]}`
                idStorage.setItem('username').value= `${data['data'][0][6]}`
                document.getElementById('password').value= `${data['data'][0][7]}`
                console.log(`${data['data'][0][6]}`, `${data['data'][0][7]}`)
            }) 
            alert("Login Successful!")
            window.location="adopt_page.html"
        }
    });
    
   
})

// function submitForm(event) {
//     event.preventDefault();
//     login();
// }

// form.addEventListener("submit", submitForm);



// if localStorage == "null"
