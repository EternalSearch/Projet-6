// Si token existe dans local storage alors affiche logout
const loginElement = document.querySelector(".js-navlogin")
if (window.localStorage.getItem("token")) { // Si token trouvé
    loginElement.innerText = "logout";
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        window.location.href = "./index.html";
        loginElement.innerText = "login";
    })

    const topbar = document.querySelector(".topbar");
    if (topbar) {
        topbar.classList.remove("hide_element"); // Affiche la topbar
    }

    const iconProject = document.querySelector(".portfolio__editbutton");
    if (iconProject) {
        iconProject.classList.remove("hide_element"); // Affiche l'élément icon_project
    }
} else {
    loginElement.innerText = "login"
    const link = document.querySelector(".navbar__link");
    link.href = "./login.html";
}


