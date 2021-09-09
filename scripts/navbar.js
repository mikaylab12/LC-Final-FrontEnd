// button functionality
function toggleSideNavbar() {
    document
      .getElementsByClassName("sideNavbar-links")[0]
      .classList.toggle("active");
}

let links = document.getElementsByClassName('sideNavbar-link');

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', close);
}
  
function close(){
    toggleSideNavbar()
};
  
document.body.addEventListener("click", navbar)

function navbar(event) {
    console.log(event.clientX)

    if (event.clientX < (window.innerWidth/2)){
        console.log(12)
        document
      .getElementsByClassName("sideNavbar-links")[0]
      .classList.remove("active");
 
}};
