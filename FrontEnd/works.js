import { ifToken } from "./auth.js";

// Récupération des projets depuis l'API
const reponse = await fetch('http://localhost:5678/api/works/');
const works= await reponse.json();



//Creation des boutons pour filtrer les projets
const btnProjets=document.querySelector(".btnProjects");
const btnObjets= document.querySelector(".btnObjects");
const btnAppartements=document.querySelector(".btnAppartments");
const btnHotels=document.querySelector(".btnHostels");
ifToken();

function genererProjets(works){
    for (let i = 0; i< works.length; i++){
        const figure = works[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionProjets = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projet = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src=figure.imageUrl;
        const titreElement = document.createElement("figcapture");
        titreElement.innerText=figure.title;
        
        //On rattache la balise article a la section Portfolio
        sectionProjets.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(titreElement);
    }
}

genererProjets(works);

btnProjets.addEventListener("click",function(){
    document.querySelector(".gallery").innerHTML="";
    genererProjets(works);
});

btnObjets.addEventListener("click", function () {
    const projetFiltrees = works.filter(function (projet) {
        return projet.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetFiltrees);
});

btnAppartements.addEventListener("click", function (){
    const projetsFiltrees = works.filter(function(projet){
        return projet.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML="";
    genererProjets(projetsFiltrees);
});
btnHotels.addEventListener("click",function(){
    const projetsFiltrees = works.filter(function(projet){
        return projet.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML="";
    genererProjets(projetsFiltrees);
});


let images = [];
async function fetchData() {
    const reponse = await fetch('http://localhost:5678/api/works/');
    images= await reponse.json();
    generatePics(images);
}

fetchData();



let modal= null
const openModal = function(e){
    e.preventDefault();
    modal= document.getElementById('modal1')
    modal.style.display= null;
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)
}

const closeModal = function(e){
   if(modal=== null) return
    e.preventDefault();
    modal.style.display= "none";
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click',stopPropagation)
    modal = null
}
const stopPropagation = function(e){
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click',openModal)
})      



function generatePics(images) {
  const sectionProjets = document.querySelector(".currentPics");
  sectionProjets.innerHTML = "";
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

      deleteProject.addEventListener('click', function() {
        const projectId = figure.id;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMTcxNzA5MiwiZXhwIjoxNzExODAzNDkyfQ.OlCQRhiM20tgaMmWkvm76xXtXh7b0NPo1MkXSUTOs2A");
        
        const raw = "";
        
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch(`http://localhost:5678/api/works/${projectId}`, requestOptions)
          .then((response) => { if (!response.ok) {
            throw new Error('Erreur lors de la suppression du projet');
        }projet.style.display="none";
        })
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
        
      })
      
  }
}





  const logoutButton = document.getElementById('log');
logoutButton.addEventListener('click', function (e) {
  e.preventDefault();
  // Supprimer le token du localStorage et rediriger vers la page de connexion
  localStorage.clear();
  window.location.href = 'login.html';
});
