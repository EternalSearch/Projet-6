// Variables globales 
let worksResponse = [];
let modal = null;

const categories = await fetch('http://localhost:5678/api/categories');
const categoriesResponse = await categories.json();

const worksFetch = async () => {
    console.log("fonction worksFetch se lance");
    const works = await fetch("http://localhost:5678/api/works");
    const worksData = await works.json();
    worksResponse = worksData;
}

const displayWorks = (worksResponse) => {
    console.log("fonction displayWorks se lance");
    worksResponse.forEach(work => {
        const structure = `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
        `;
        document.querySelector(".portfolio__gallery").innerHTML += structure;
    });
}

// Affichage de la modale listant les projets
const showWorksModal = () => {
    const returnArrow = windowmodal.querySelector(".fa-arrow-left") // Sélection de la flèche retour gauche
    const firstModal = windowmodal.querySelector(".modal__workslist"); // Sélection de la première modale
    const secondModal = windowmodal.querySelector(".modal__addwork"); // Sélection de la deuxième modale
    
    console.log("Fonction showWorksModal se lance");
    returnArrow.classList.add("hide_element"); // Masque la flèche gauche
    firstModal.classList.remove("hide_element"); // Affiche la première modale
    secondModal.classList.add("hide_element"); // Masque la deuxième modale
}

// Affichage de la modale d'ajout de projet
const showAddWorkModal = () => {
    const returnArrow = windowmodal.querySelector(".fa-arrow-left") // Sélection de la flèche retour gauche
    const firstModal = windowmodal.querySelector(".modal__workslist"); // Sélection de la première modale
    const secondModal = windowmodal.querySelector(".modal__addwork"); // Sélection de la deuxième modale
    
    console.log("Fonction showAddWorkModal se lance");
    returnArrow.classList.remove("hide_element"); // Affiche la flèche gauche
    secondModal.classList.remove("hide_element"); // Affiche la deuxième modale
    firstModal.classList.add("hide_element"); // Masque la première modale
}

const displayWorksModal = async (worksResponse) => {
    console.log("fonction displayWorksModal se lance");

    const adminPortfolio = document.querySelector(".modal__gallery");
    adminPortfolio.innerHTML = "";
    worksResponse.forEach(work => {
        const worksStructure = `
        <figure class="modal__img">
            <img src="${work.imageUrl}" alt="${work.title}">
            <i class="fa-regular fa-trash-can" data-id="${work.id}"></i>
        </figure>
        `;
        adminPortfolio.innerHTML += worksStructure;
    })

    const deleteIcons = adminPortfolio.querySelectorAll(".fa-trash-can");
    deleteIcons.forEach(deleteIcon => {
        const workId = deleteIcon.getAttribute("data-id");
        deleteIcon.addEventListener("click", () => {
            delWork(workId);
        });
    });
}

const generateSelectChoices = () => {
    console.log("fonction generateSelectChoices se lance");
    const selectCategories = document.getElementById("category"); // Sélection de la liste des catégories
    const defaultCategory = `<option value="" disabled selected>-- Choisir une catégorie --</option>`;
    selectCategories.innerHTML = defaultCategory;
    categoriesResponse.forEach(category => {
        const optionStructure = `<option value="${category.id}">${category.name}</option>`;
        selectCategories.innerHTML += optionStructure;
    });
}

// Fetch des projets + affichage
const init = async () => {
    console.log("fonction init se lance");
    await worksFetch();
    displayWorks(worksResponse);
    displayWorksModal(worksResponse);
    generateSelectChoices();
}
init(); // Appel de la fonction

const filterCategories = (categoriesResponse) => {
    console.log("fonction filterCategories se lance");

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
            document.querySelector(".portfolio__gallery").innerHTML = "";
            console.log(filteredWorks);

            displayWorks(filteredWorks);
        });
    }
}
filterCategories(categoriesResponse);


const windowmodal = document.getElementById("modal1"); // Sélection de la modale complète
const displayModal = (event) => {
    console.log("fonction displayModal se lance");
    event.preventDefault();

    modal = document.querySelector(".modal");
    modal.classList.add("show_modal");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");

    modal.addEventListener("click", closeModal); // Listener 1 : Au clic n'importe où sur la modale (fond gris + fond blanc), elle se ferme
    const modalClose = modal.querySelector(".js-modal-close");
    modalClose.addEventListener("click", closeModal); // Listener 2 : Au clic sur la croix, la modale se ferme
    const modalStop = modal.querySelector(".js-modal-stop");
    modalStop.addEventListener("click", stopPropagation);
    // Listener 3 : Au clic sur l'élément .js-modal-stop (fond blanc), on lance la fonction stopPropagation
    // qui permet de ne pas appliquer le listener 1 dessus. La modale se fermera que si clic sur fond gris

    // fermeture de la modale avec la touche échap
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeModal(e);
        }
        if (event.key === 'Tab' && modal !== null) {
            focusInModal(event);
        }
    });

    const modalButton = windowmodal.querySelector(".modal_button"); // Sélection du bouton "Ajouter la photo"
    modalButton.addEventListener("click", showAddWorkModal);

}

const closeModal = (event) => {
    event.preventDefault();
    if (modal === null) return;     // si modale fermée elle ne se déclenche pas

    console.log("fonction closeModal se lance");
    formReset();
    modal.classList.remove("show_modal");
    modal.removeAttribute("aria-modal");
    modal.setAttribute("aria-hidden", "true");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
    showWorksModal();
    displayWorks(worksResponse);
}

const stopPropagation = (event) => {
    event.stopPropagation();
}

const formReset = () => {
    const form = windowmodal.querySelector(".modal__form"); // Sélection du formulaire de la modale
    form.reset();
    document.querySelector(".modal__newimg").src = "";
    document.querySelector(".modal__newimg").classList.add("hide_element");
    document.querySelector(".modal__importimg").classList.remove("hide_element");
}

const listenerElement = document.querySelector(".portfolio__editbutton");
listenerElement.addEventListener("click", displayModal);