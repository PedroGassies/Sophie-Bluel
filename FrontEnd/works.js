// Récupération des pièces depuis l'API
const reponse = await fetch('http://localhost:5678/api/works/');
const works= await reponse.json();

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