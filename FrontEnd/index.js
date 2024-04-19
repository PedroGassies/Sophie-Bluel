const modalContent = modalContentCreation();

/******************** UPDATE USER INTERFACE *********************************/
function updateUi() {
    if (localStorage.getItem('token')) {
        document.getElementById('headEdit').style.visibility = "visible";
        document.querySelector('.js-modal').style.visibility = "visible";
        document.querySelector('.index').style.margin = '15px';
        document.getElementById('log').innerHTML = '<a href="login.html" id="log">logout';
        document.querySelector(".btnProjects").style.visibility = "hidden";
        document.querySelector(".btnObjects").style.visibility = "hidden";
        document.querySelector(".btnAppartments").style.visibility = "hidden";
        document.querySelector(".btnHostels").style.visibility = "hidden";
    }
}


// Récupération des projets depuis l'API
async function APIProjects() {
    const reponse = await fetch('http://localhost:5678/api/works/');
    const works = await reponse.json();
    genererProjets(works);
    generateFilters(works);
}


/*******************************   GENERER FILTRES  ******************************/
function generateFilters(works) {
    const btnProjets = document.querySelector(".btnProjects");
    const btnObjets = document.querySelector(".btnObjects");
    const btnAppartements = document.querySelector(".btnAppartments");
    const btnHotels = document.querySelector(".btnHostels");
    btnProjets.addEventListener("click", function () {
        btnProjets.style.backgroundColor = ' #1D6154';
        btnProjets.style.color = 'white'
        btnObjets.style.backgroundColor = 'white ';
        btnObjets.style.color = '#1D6154'
        btnAppartements.style.backgroundColor = ' #white';
        btnAppartements.style.color = '#1D6154'
        btnHotels.style.backgroundColor = ' #white';
        btnHotels.style.color = '#1D6154'
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(works);
    });

    btnObjets.addEventListener("click", function () {
        btnObjets.style.backgroundColor = ' #1D6154';
        btnObjets.style.color = 'white'
        btnProjets.style.backgroundColor = ' white';
        btnProjets.style.color = '#1D6154'
        btnAppartements.style.backgroundColor = 'white';
        btnAppartements.style.color = '#1D6154'
        btnHotels.style.backgroundColor = ' white';
        btnHotels.style.color = '#1D6154'
        const projetFiltrees = works.filter(function (projet) {
            return projet.categoryId == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetFiltrees);
    });

    btnAppartements.addEventListener("click", function () {
        btnAppartements.style.backgroundColor = ' #1D6154';
        btnAppartements.style.color = 'white'
        btnObjets.style.backgroundColor = ' white';
        btnObjets.style.color = '#1D6154'
        btnProjets.style.backgroundColor = ' white';
        btnProjets.style.color = '#1D6154'
        btnHotels.style.backgroundColor = ' white';
        btnHotels.style.color = '#1D6154'
        const projetsFiltrees = works.filter(function (projet) {
            return projet.categoryId == 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltrees);
    });
    btnHotels.addEventListener("click", function () {
        btnHotels.style.backgroundColor = ' #1D6154';
        btnHotels.style.color = 'white'
        btnProjets.style.backgroundColor = ' white';
        btnProjets.style.color = '#1D6154'
        btnObjets.style.backgroundColor = 'white ';
        btnObjets.style.color = '#1D6154'
        btnAppartements.style.backgroundColor = ' white';
        btnAppartements.style.color = '#1D6154'
        const projetsFiltrees = works.filter(function (projet) {
            return projet.categoryId == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltrees);
    });
}


/*********************************** GENERER PROJETS  ***************************************/
function genererProjets(works) {
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionProjets = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projet = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const titreElement = document.createElement("figcapture");
        titreElement.innerText = figure.title;
        projet.setAttribute('id', figure.projectId)
        //On rattache la balise article a la section Portfolio
        sectionProjets.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(titreElement);
    }
}





/********************** FETCH DATA   *********************************/
let images = [];
async function fetchData() {
    const reponse = await fetch('http://localhost:5678/api/works/');
    images = await reponse.json();
    generatePics(images);
}



/************************ MODAL SETTINGS  **********************************/
let modal = null;

const stopPropagation = function (e) {
    e.stopPropagation();
};

function closeModal(e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation);
    modal = null;
};

function modalSettings() {
    const openModal = function (e) {
        e.preventDefault();
        modal = document.getElementById('modal1');
        modal.style.display = null;
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', 'true');
        modal.addEventListener('click', closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-wrapper ').addEventListener('click', stopPropagation);
    };

    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal);
    });
}







/*************************** GENERATE IMAGES IN MODAL **************************/
function generatePics(images) {
    const sectionProjets = document.querySelector(".currentPics")
    for (let i = 0; i < images.length; i++) {
        const figure = images[i];
        const projet = document.createElement("figure");
        const imageElement = document.createElement("img");
        const deleteProject = document.createElement("img"); // Création de l'élément img pour le SVG
        deleteProject.src = "data:image/svg+xml;base64," + btoa(`
          <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
              <rect width="17" height="17" rx="2" fill="black"/>
              <path d="M6.71607 3.35558C6.82455 3.13661 7.04754 3 7.29063 3H9.70938C9.95246 3 10.1754 3.13661 10.2839 3.35558L10.4286 3.64286H12.3571C12.7127 3.64286 13 3.93013 13 4.28571C13 4.64129 12.7127 4.92857 12.3571 4.92857H4.64286C4.28728 4.92857 4 4.64129 4 4.28571C4 3.93013 4.28728 3.64286 4.64286 3.64286H6.57143L6.71607 3.35558ZM4.64286 5.57143H12.3571V12C12.3571 12.7092 11.7806 13.2857 11.0714 13.2857H5.92857C5.21942 13.2857 4.64286 12.7092 4.64286 12V5.57143ZM6.57143 6.85714C6.39464 6.85714 6.25 7.00179 6.25 7.17857V11.6786C6.25 11.8554 6.39464 12 6.57143 12C6.74821 12 6.89286 11.8554 6.89286 11.6786V7.17857C6.89286 7.00179 6.74821 6.85714 6.57143 6.85714ZM8.5 6.85714C8.32321 6.85714 8.17857 7.00179 8.17857 7.17857V11.6786C8.17857 11.8554 8.32321 12 8.5 12C8.67679 12 8.82143 11.8554 8.82143 11.6786V7.17857C8.82143 7.00179 8.67679 6.85714 8.5 6.85714ZM10.4286 6.85714C10.2518 6.85714 10.1071 7.00179 10.1071 7.17857V11.6786C10.1071 11.8554 10.2518 12 10.4286 12C10.6054 12 10.75 11.8554 10.75 11.6786V7.17857C10.75 7.00179 10.6054 6.85714 10.4286 6.85714Z" fill="white"/>
          </svg>
      `);
        projet.classList.add('project-container');
        imageElement.classList.add('project-image');
        deleteProject.classList.add('delete-icon');

        imageElement.src = figure.imageUrl;
        sectionProjets.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(deleteProject);

        deleteProject.addEventListener('click', function (e) {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (token) {
                const projectId = figure.id;
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);

                const raw = "";

                const requestOptions = {
                    method: "DELETE",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch(`http://localhost:5678/api/works/${projectId}`, requestOptions)
                    .then((response) => {
                    })
                    .then((result) => {
                        APIProjects();
                    })
                    .catch((error) => console.error(error));
            }
            else {
                disconnect()
            }
        })

    }
}




/****************************** LOG OUT  ***********************************/
function disconnect() {
    const logout = () => {
        localStorage.clear();
        window.location.href = 'login.html';
    }

    const logoutButton = document.getElementById('log');
    logoutButton.addEventListener('click', function (e) {
        e.preventDefault();
        // Supprimer le token du localStorage et rediriger vers la page de connexion
        logout();
    });
}


/********************************** ADD PROJECTS  **************************************/
function modalContentCreation() {
    const modalContent = document.querySelector('.modal-wrapper');
    return modalContent;
}

function switchModal(modalContent) {
    const addPhoto = document.getElementById('addPhoto')
    addPhoto.addEventListener("click", function () {
        cleanModal(modalContent);
    });
};
function cleanModal(modalContent) {
    modalContent.innerHTML = '';
    const buttons = buttonsDiv(modalContent);
    modalContentCreation();
    backButton(buttons);
    closeButton(buttons);
    titleModal(modalContent);
    const uploadFiles = divUpload(modalContent);
    uploadingFiles(uploadFiles);
    selectTitle(modalContent)
    selectCategory(modalContent);
    addProjects(modalContent);
};

function titleModal(modalContent) {
    // title h2
    const title = document.createElement('h2');
    title.setAttribute('class', 'titlemodal')
    title.textContent = 'Ajout photo'
    modalContent.appendChild(title);
}
function buttonsDiv(modalContent) {
    // Creating buttons's div
    modalContent.setAttribute('class', 'modal-wrapper');
    const buttons = document.createElement('div');
    buttons.setAttribute('class', 'buttons');
    modalContent.appendChild(buttons);
    return buttons;
}

function backButton(buttons) {

    const backButton = document.createElement('button');
    backButton.setAttribute('class', 'return');
    backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <path d="M0.439478 8.94458C-0.146493 9.53055 -0.146493 10.4822 0.439478 11.0681L7.9399 18.5686C8.52587 19.1545 9.47748 19.1545 10.0635 18.5686C10.6494 17.9826 10.6494 17.031 10.0635 16.445L5.11786 11.5041H19.4999C20.3297 11.5041 21 10.8338 21 10.004C21 9.17428 20.3297 8.50393 19.4999 8.50393H5.12255L10.0588 3.56303C10.6447 2.97706 10.6447 2.02545 10.0588 1.43948C9.47279 0.853507 8.52118 0.853507 7.93521 1.43948L0.43479 8.9399L0.439478 8.94458Z" fill="black"/>
    </svg>`;
    buttons.appendChild(backButton);
    backButton.addEventListener('click', function () {
        modalContent.innerHTML = '';
        modalContentCreation();
        closeButton(modalContent);
        const title = document.createElement('h2');
        title.setAttribute('class', 'titlemodal')
        title.textContent = 'Ajout photo'
        modalContent.appendChild(title);

        const center = document.createElement('div');
        center.setAttribute('class', 'center')
        modalContent.appendChild(center);

        const currentPics = document.createElement('div');
        currentPics.setAttribute('class', 'currentPics')
        center.appendChild(currentPics)
        generatePics(images);

        const trait = document.createElement('div');
        trait.setAttribute('class', 'trait');
        center.appendChild(trait);

        const addPhoto = document.createElement('input');
        addPhoto.setAttribute('type', 'submit');
        addPhoto.setAttribute('value', 'Ajouter une photo')
        addPhoto.setAttribute('id', 'addPhoto');
        modalContent.appendChild(addPhoto);
        addPhoto.addEventListener("click", function () {
            cleanModal(modalContent);
        });

    })
}
function closeButton(buttons) {
    // Créer le bouton pour fermer la modal
    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'js-modal-close js-modal-stop');
    closeButton.innerHTML = `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
    </svg>`;
    buttons.appendChild(closeButton);

    closeButton.addEventListener('click', function (e) {
        closeModal(e);
        stopPropagation(e);
    });
    modalContent.style.display = 'block';
    return closeButton;
}
function divUpload(modalContent) {
    const uploadFiles = document.createElement('div');
    uploadFiles.className = 'uploadFiles';
    modalContent.appendChild(uploadFiles);
    return uploadFiles;
}
function uploadingFiles(uploadFiles) {
    const logoPic = document.createElement('svg');
    logoPic.className = 'logoPic';
    logoPic.innerHTML = `<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.5517 15.8879C64.7228 15.8879 65.681 16.8461 65.681 18.0172V60.5768L65.0156 59.7118L46.9165 36.2894C46.3176 35.5042 45.3727 35.0517 44.3879 35.0517C43.4031 35.0517 42.4715 35.5042 41.8594 36.2894L30.8136 50.5824L26.7546 44.8998C26.1557 44.0614 25.1975 43.569 24.1595 43.569C23.1214 43.569 22.1632 44.0614 21.5644 44.9131L10.9178 59.8183L10.319 60.6434V60.6034V18.0172C10.319 16.8461 11.2772 15.8879 12.4483 15.8879H63.5517ZM12.4483 9.5C7.75048 9.5 3.93103 13.3195 3.93103 18.0172V60.6034C3.93103 65.3012 7.75048 69.1207 12.4483 69.1207H63.5517C68.2495 69.1207 72.069 65.3012 72.069 60.6034V18.0172C72.069 13.3195 68.2495 9.5 63.5517 9.5H12.4483ZM23.0948 35.0517C23.9337 35.0517 24.7644 34.8865 25.5394 34.5655C26.3144 34.2444 27.0186 33.7739 27.6118 33.1807C28.2049 32.5876 28.6755 31.8834 28.9965 31.1083C29.3175 30.3333 29.4828 29.5027 29.4828 28.6638C29.4828 27.8249 29.3175 26.9943 28.9965 26.2192C28.6755 25.4442 28.2049 24.74 27.6118 24.1468C27.0186 23.5537 26.3144 23.0831 25.5394 22.7621C24.7644 22.4411 23.9337 22.2759 23.0948 22.2759C22.2559 22.2759 21.4253 22.4411 20.6503 22.7621C19.8752 23.0831 19.171 23.5537 18.5779 24.1468C17.9847 24.74 17.5142 25.4442 17.1931 26.2192C16.8721 26.9943 16.7069 27.8249 16.7069 28.6638C16.7069 29.5027 16.8721 30.3333 17.1931 31.1083C17.5142 31.8834 17.9847 32.5876 18.5779 33.1807C19.171 33.7739 19.8752 34.2444 20.6503 34.5655C21.4253 34.8865 22.2559 35.0517 23.0948 35.0517Z" fill="#B9C5CC"/>
        </svg>`;
    uploadFiles.appendChild(logoPic);


    // Create button for uploading file
    const fileButton = document.createElement('button');
    fileButton.className = 'fileButton';
    fileButton.innerText = '+ Ajouter photo'

    // Créer le champ pour uploader une image
    const imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('id', 'imageInput');
    imageInput.setAttribute('name', 'imageInput');
    imageInput.style.display = 'none';
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = document.createElement('img');
                image.src = e.target.result;
                image.style.maxWidth = '100%';
                uploadFiles.appendChild(image);
            };
            reader.readAsDataURL(file);
        }

        // Cacher les autres éléments
        logoPic.style.display = 'none';
        fileButton.style.display = 'none';
        stock.style.display = 'none';
    });



    fileButton.addEventListener('click', () => {
        imageInput.click();
    });

    fileButton.appendChild(imageInput);
    uploadFiles.appendChild(fileButton);

    const stock = document.createElement('p');
    stock.innerText = "jpg, png : 4mo max";
    uploadFiles.appendChild(stock);

}

function selectTitle(modalContent) {
    // Créer le titre du projet
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'titleInput');
    titleLabel.textContent = 'Titre';
    modalContent.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'titleInput');
    titleInput.setAttribute('name', 'titleInput');
    modalContent.appendChild(titleInput);

}


function selectCategory(modalContent) {
    // Créer le champ pour choisir une catégorie
    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'categorySelect');
    categoryLabel.textContent = 'Catégorie';
    modalContent.appendChild(categoryLabel);

    const categorySelect = document.createElement('select');
    categorySelect.setAttribute('id', 'categorySelect');
    categorySelect.setAttribute('name', 'categorySelect');

    // Ajouter une option vide pour qu'aucune catégorie ne soit sélectionnée par défaut
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', '');
    categorySelect.appendChild(defaultOption);
    // Ajouter les options de catégorie
    // async methode
    async function fetchCategories() {
        const reponse = await fetch('http://localhost:5678/api/categories/');
        const categories = await reponse.json();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }
    fetchCategories();
    modalContent.appendChild(categorySelect);

    const trait = document.createElement('div');
    trait.className = ' trait';
    modalContent.appendChild(trait);
}




function addProjects(modalContent) {
    const addProject = document.createElement('input');
    addProject.setAttribute('type', 'submit');
    addProject.setAttribute('value', 'Valider');
    addProject.setAttribute('id', 'addProject');
    modalContent.appendChild(addProject);

    addProject.addEventListener('click', function (e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            const image = imageInput.files[0];
            const title = titleInput.value;
            const category = categorySelect.value;

            if (image && title && category) {

                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);

                const formdata = new FormData();
                formdata.append("image", image);
                formdata.append("title", title);
                formdata.append("category", category);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: formdata,
                    redirect: "follow"
                };

                fetch(`http://localhost:5678/api/works`, requestOptions)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Erreur lors de l'ajout du projet");
                        }
                        return response.json(); // Convertir la réponse en JSON
                    })
                    .then((result) => {
                        result = document.querySelector(projet)
                        sectionProjets.appendChild(result)
                    })
                    .catch((error) => {
                        //console.error(error)
                    });
            } else {
                alert("Veuillez remplir tous les champs");
            }
        }
    })
}





APIProjects();
updateUi();
fetchData();
switchModal(modalContent);
closeModal();
modalSettings();
disconnect();
