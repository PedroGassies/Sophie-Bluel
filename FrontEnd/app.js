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
    modal= document.querySelector(e.target.getAttribute('href'))
    modal.style.display= null;
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)
}

const closeModal = function(e){
   if(modal=== null) return
    e.preventDefault()
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



function generatePics(images){
    const sectionProjets = document.querySelector(".currentPics");
    sectionProjets.innerHTML = "";
    for (let i = 0; i< images.length; i++){
        const figure = images[i];

        const projet = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src=figure.imageUrl;
        sectionProjets.appendChild(projet);
        projet.appendChild(imageElement);
    }
}


/*
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMTU1NDA0NCwiZXhwIjoxNzExNjQwNDQ0fQ.nTLhiQBkGzEqMzWbhEgHZnht-49k8ycr5BY4PM_kVl0");

const raw = "";

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:5678/api/works/{id}", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
*/

  const logoutButton = document.getElementById('log');
logoutButton.addEventListener('click', function (e) {
  e.preventDefault();
  // Supprimer le token du localStorage et rediriger vers la page de connexion
  localStorage.clear();
  window.location.href = 'login.html';
});
