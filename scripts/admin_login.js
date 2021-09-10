// Login Function for admin users
// let entry_token = window.localStorage.getItem("jwt-token")

let form = document.getElementById("form")

form.addEventListener("submit", function (event){
    event.preventDefault()
    fetch('https://my-final-project-backend.herokuapp.com/login-admin/', {
    method: "POST",
    body: JSON.stringify({
        'admin_username': document.getElementById("admin_username").value,
        'admin_password': document.getElementById("admin_password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        myStorage = window.localStorage
        // console.log(data['entry__token'])
        // myStorage.setItem('jwt-token', data['entry__token'])
        if (data['message'] == "Please enter valid credentials."){
            alert("Error, This is not a valid login in!")
        }
        // else if (entry_token == ""){
        //     alert("Error, This is not a valid login in!")
        // }
        else{
            alert("Successful Login!")
            window.location="admin_users.html"
        }
    });
});

