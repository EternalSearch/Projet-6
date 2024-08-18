

// Si token existe ds local storage alors affiche logout


// function connection(e) {
    
const loginElement = document.querySelector(".navlogin")

if (window.localStorage.getItem("token")) { // Si token trouvé

    loginElement.innerText = "logout";
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        window.location.href = "../index.html";
        loginElement.innerText = "login";
    })

    const topbar = document.querySelector(".top_bar");
    topbar.classList.remove("hide_element"); // Affiche la topbar
    const layoutHeader = document.querySelector(".layout_header");
    layoutHeader.classList.add("layout_header--margin"); // Place un margin-top sur le layout_header

    const iconProject = document.querySelector(".icon_project");
    iconProject.classList.remove("hide_element"); // Affiche l'élément icon_project

} else {
    loginElement.innerText = "login"
    const link = document.querySelector(".login_link");
    link.href = "../login.html";
}


