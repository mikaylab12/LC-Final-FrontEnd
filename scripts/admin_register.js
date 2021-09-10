let form = document.getElementById("form")

// function to register as admin user 
form.addEventListener("submit", function (event){
    event.preventDefault()
    fetch('https://my-final-project-backend.herokuapp.com/register-admin/', {
    method: "POST",
    body: JSON.stringify({
        'admin_id': JSON.parse(document.getElementById("admin_id").value),
        'admin_name': document.getElementById("admin_name").value,
        'admin_surname': document.getElementById("admin_surname").value,
        'admin_email': document.getElementById("admin_email").value,
        'admin_contact': document.getElementById("admin_contact").value,
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
        // if (typeof(document.getElementById("admin_id").value) == String ){
        //     alert("Error, Please enter a valid ID consisting of digits only.")
        // }
        if (data['message'] == "Please enter valid credentials."){
            alert("Error, This is not a valid login in!")
        }
        if (document.getElementById('admin_id').value.length != 13) {
            alert("Error, Please enter a valid ID number consisting of 13 digits.")
        }
        else if (data['status_code'] == 401){
            alert("Error, Please enter a valid ID consisting of digits only.")
        }
        else if (data['status_code'] == 404){
            alert("Error, Please note that this username exists already.")
        }
        else if (data['message'] == "Please enter a valid email address."){
            alert("Error, Please enter a valid email address.")
        }
        else if (data['message'] == "Please enter a valid phone number that consists of 10 digits."){
            alert("Error, Please enter a valid contact number consisting of 10 digits.")
        }
        else if (data['message'] == "Please enter a phone number consisting of digits only."){
            alert("Error, Please enter a valid contact number consisting of digits only.")
        }
        else{
            alert("Succesful Registration")
            window.location.href='admin-signIn.html'
        }
    });
});