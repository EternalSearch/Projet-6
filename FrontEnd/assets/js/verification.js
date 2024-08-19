// Si token existe dans local storage alors affiche logout
const loginElement = document.querySelector(".js-navlogin")
if (window.localStorage.getItem("token")) { // Si token trouvé
    console.log("Le token existe");
    

    loginElement.innerText = "logout";
    loginElement.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        window.location.href = "../index.html";
        loginElement.innerText = "login";
    })

    const topbar = document.querySelector(".topbar");
    topbar.classList.remove("hide_element"); // Affiche la topbar

    const iconProject = document.querySelector(".portfolio__editbutton");
    iconProject.classList.remove("hide_element"); // Affiche l'élément icon_project

} else {
    console.log("[X] Le token n'existe pas");

    loginElement.innerText = "login"
    const link = document.querySelector(".navbar__link");
    link.href = "../login.html";
}


