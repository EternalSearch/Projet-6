
const categories = await fetch('http://localhost:5678/api/categories');
const categoriesResponse = await categories.json();

function filterCategories(categoriesResponse) {

    for (let i = 0; i < categoriesResponse.length; i++) {
        if (i === 0) {
            const filterContainer = document.querySelector(".portfoliobuttons_filter");
            const filterButtonTous = document.createElement("div");
            filterButtonTous.classList.add("filterbutton")

            filterButtonTous.innerText = "Tous";

            filterContainer.appendChild(filterButtonTous);
        }

        const category = categoriesResponse[i]
        const filterContainer = document.querySelector(".portfoliobuttons_filter");
        const filterButton = document.createElement("div");
        filterButton.classList.add("filterbutton")
        filterButton.innerText = category.name;

        filterContainer.appendChild(filterButton);

    }
}
filterCategories(categoriesResponse);

// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

const filterBtnList = document.querySelectorAll(".filterbutton");
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
        displayWorks(filteredWorks);
    });
}


// Récupération depuis l'Api et conversion des travaux en Json
const works = await fetch("http://localhost:5678/api/works");
const worksResponse = await works.json();

// Création fonction d'affichage travaux
function displayWorks(worksResponse) {
    for (let i = 0; i < worksResponse.length; i++) {
        const work = worksResponse[i];
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
displayWorks(worksResponse);
 cxc xxxxx

// import {displayListeneremail}from "./avis.js";
// displayListeneremail()

// filter.addEventListener("click",function
// (categoriesResponse){;

// });



