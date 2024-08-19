

 
    // const displayemail = document.querySelector("form")
    // displayemail.addEvenListerner("submit", function (event) {
    //     event.preventDefault();
        const renseignements = {
            email: document.getElementbyId("email").value,
        
            password: document.getElementbyId("password").value
        };
        const fetchlogin = await fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: { "Content-Type": "application:json" },
            body: JSON.stringify(renseignements),
        })

        let wordok  = true
        if (wordok) {
            console.log (super)
          
            (data)
            window.localStorage.setItem(return => token);
        else 
        console.log(nein nein nein)

        }   window.localStorage.getItem    





















    const motTapeOk = true
    let useeremail = prompt(bonjour)
    if (mottapeok === useremail) {
        console.log("c'est génial")

    } else {
        console.log("ce n'est pas top")
    }
