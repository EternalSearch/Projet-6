// Récupération depuis l'Api et conversion des travaux en Json
const works = await fetch("http://localhost:5678/api/works");
const worksResponse = await works.json();

// Création fonction d'affichage travaux
function displayWorks(worksResponse) {
    for (let i = 0; i < worksResponse.length; i++) {
        const work = worksResponse[i]
        const worksContainer = document.querySelector(".gallery");
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");


        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;
        figcaptionElement.innerText = work.title;

        // Ajout de figure dans le conteneur .gallery
        worksContainer.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
    }
}
displayWorks(worksResponse)