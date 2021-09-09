// user registration function 
let form = document.getElementById("form")

form.addEventListener("submit", function (event){
    event.preventDefault()
    fetch('https://my-final-project-backend.herokuapp.com/register/', {
    method: "POST",
    body: JSON.stringify({
        'user_id': document.getElementById("user_id").value,
        'first_name': document.getElementById("first_name").value,
        'last_name': document.getElementById("last_name").value,
        'email_address': document.getElementById("email_address").value,
        'contact_number': document.getElementById("contact_number").value,
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
        if (data['message'] == "Please enter valid credentials."){
            alert("Error, This is not a valid login in!")
        }
        if (document.getElementById('user_id').value.length != 13) {
            alert("Error, Please enter a valid ID number consisting of 13 digits.")
        }
        else if (data['status_code'] == 400){
            alert("Error, Please enter a valid contact number consisting of 10 digits.")
        }
        else if (data['message'] == "Please enter a valid email address."){
            alert("Error, Please enter a valid email address.")
        }
        else if (data['message'] == "Please enter a valid phone number that consists of 10 digits."){
            alert("Error, Please enter a valid contact number consisting of 10 digits.")
        }
        else if (data['message'] == "Please enter a valid phone number containing digits only."){
            alert("Error, Please enter a valid contact number consisting of digits only.")
        }
        else{
            alert("Succesful Registration")
            window.location.href='sign-in.html'
        }
    });
});