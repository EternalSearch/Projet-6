
const categories = await fetch('http://localhost:5678/api/categories');
const categoriesResponse = await categories.json();

const filterCategories = (categoriesResponse) => {
    // Affichage de la barre de filtres
    const filterContainer = document.querySelector(".portfolio__filterbar");
    var structure = "<div class='portfolio__filterbutton'>Tous</div>"
    filterContainer.innerHTML = structure
    categoriesResponse.forEach(category => {
        structure = `<div class="portfolio__filterbutton">${category.name}</div>`
        filterContainer.innerHTML += structure
    })
    // Ajout des listeners
    const filterBtnList = document.querySelectorAll(".portfolio__filterbutton");
    for (let i = 0; i < filterBtnList.length; i++) {
        filterBtnList[i].addEventListener("click", () => {
            const filteredWorks = worksResponse.filter(function (work) {
                if (i === 0) {
                    return work.categoryId;
                } else {
                    return work.categoryId === i;
                }
            });
            document.querySelector(".gallery").innerHTML = "";
            console.log(filteredWorks);

            displayWorks(filteredWorks);
        });
    }
}
filterCategories(categoriesResponse);

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