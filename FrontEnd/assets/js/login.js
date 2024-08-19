//  récupération des identifiants
const displayemail = document.querySelector(".login__form");
displayemail.addEventListener("submit", async (event) => {
    event.preventDefault();
    const renseignements = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    // envoi du mdp/email à l'API 
    const fetchlogin = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(renseignements),
    })

    const data = await fetchlogin.json();
    if (fetchlogin.ok) {
        window.localStorage.setItem("token", data.token);
        window.location.href = "../index.html";
    } else {
        alert("E-mail et/ou mot de passe incorrect");
    }
})