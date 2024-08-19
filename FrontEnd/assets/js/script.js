// Récupération du token via localstorage
const token = window.localStorage.getItem("token");
console.log("Token : " + token);

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
    document.querySelector(".portfolio__gallery").innerHTML = "";
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
const returnArrow = windowmodal.querySelector(".fa-arrow-left") // Sélection de la flèche retour gauche
returnArrow.addEventListener("click", () => { // Création d'un listener pour la flèche retour gauche
    formReset();
    showWorksModal();
});

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
            closeModal(event);
        }
        if (event.key === 'Tab' && modal !== null) {
            focusInModal(event);
        }
    });

    const modalButton = windowmodal.querySelector(".modal__workslist .modal__submit"); // Sélection du bouton "Ajouter une photo"
    modalButton.addEventListener("click", showAddWorkModal);

    const body = document.querySelector("body");
    body.classList.add("stop-scrolling"); // Empeche le scroll quand la modale est ouverte

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

    const body = document.querySelector("body");
    body.classList.remove("stop-scrolling"); // Permet le scroll quand la modale est fermée

    showWorksModal();
    displayWorks(worksResponse);
}

const form = windowmodal.querySelector(".modal__form"); // Sélection du formulaire de la modale
const addWorkModal = () => {
    console.log("fonction addWorkModal se lance");

    document.querySelector(".js-modal-close").addEventListener("click", closeModal);

    const inputFile = document.getElementById("importPicture");
    const preview = document.querySelector(".modal__newimg");

    inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.src = event.target.result;
                preview.classList.remove("hide_element");
                document.querySelector(".modal__importimg").classList.add("hide_element");
            }
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }

    })

    const modalForm = document.querySelector(".modal__form");
    if (modalForm) {
        modalForm.addEventListener("submit", (event) => addWork(event, inputFile));

    } else {
        console.log(".modal_form n'a pas été trouvé");
    }
}

const addWork = async (event, inputFile) => {
    console.log("fonction addWork se lance");

    event.preventDefault();
    try {
        if (inputFile.files.length > 0) {       // Vérifie si un fichier a été sélectionné
            const file = inputFile.files[0];
            const fileSize = file.size;         // Récupération taille du fichier en octets
            const maxSize = 4 * 1024 * 1024;    // Taille max autorisée en octets (4Mo)
            if (fileSize > maxSize) {
                const image = document.querySelector(".modal__newimg");
                const importimg = document.querySelector(".modal__importimg");
                event.preventDefault();         // Empêche envoi du formulaire
                alert("Fichier trop volumineux (4Mo maximum)");     // Affiche une erreur
                image.src = "";                         // Efface l'image
                image.classList.add("hide_element");    // Cache l'aperçu de l'image
                importimg.classList.remove("hide_element"); // Affiche le bouton "+ Ajouter photo"
                return;
            } else {
                console.log("Taille du fichier : " + fileSize + " octets");
                console.log("Taille max autorisée : " + maxSize + " octets");
                console.log("Fichier valide");

                const formData = new FormData(form);
                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log("Projet ajouté");
                    formReset();
                    init().then(() => closeModal(event));
                }
            }
        }

    } catch (error) {
        console.error("Erreur lors de l'ajout du travail:", error);
    }
}

const stopPropagation = (event) => {
    event.stopPropagation();
}

const formReset = () => {
    form.reset();
    document.querySelector(".modal__newimg").src = "";
    document.querySelector(".modal__newimg").classList.add("hide_element");
    document.querySelector(".modal__importimg").classList.remove("hide_element");
}

const listenerElement = document.querySelector(".portfolio__editbutton");
listenerElement.addEventListener("click", displayModal);

addWorkModal();