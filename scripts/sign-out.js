// fucntion to wipe the local storage when signing out 
function signOut() {
    localStorage.clear()
    console.log("Local Storage cleared.")
    console.log(localStorage)
    alert("Please note that you have successfuly logged out!")
}

