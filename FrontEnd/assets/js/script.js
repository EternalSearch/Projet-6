// Récupération depuis l'Api et conversion des travaux en Json
const works = await fetch("http://localhost:5678/api/works");
const worksResponse = await works.json();

// Création fonction d'affichage travaux
const displayWorks = (worksResponse) => {
    worksResponse.forEach(work => {
        const structure = `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
        `;
        document.querySelector(".gallery").innerHTML += structure;
    });
}

displayWorks(worksResponse);