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

//Creation des boutons pour filtrer les projets
const btnProjets=document.createElement("button");
const btnObjets= document.createElement("button");
const btnAppartements=document.createElement("button");
const btnHotels=document.createElement("button");


btnProjets.textContent="Tous";
btnObjets.textContent="Objets";
btnAppartements.textContent="Appartements";
btnHotels.textContent="Hotels & restaurants";

//Affilier boutons a la classe filtres
const btnFiltres= document.querySelector(".filtres");

btnFiltres.appendChild(btnProjets);
btnFiltres.appendChild(btnObjets);
btnFiltres.appendChild(btnAppartements);
btnFiltres.appendChild(btnHotels);



btnProjets.addEventListener("click",function(){
    document.querySelector(".gallery").innerHTML="";
    genererProjets(works);
});

btnObjets.addEventListener("click", function () {
    const projetFiltrees = works.filter(function (projet) {
        return projet.categoryId = 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetFiltrees);
});

btnAppartements.addEventListener("click",function(){
    const projetsFiltrees = works.filter(function(projet){
        return projet.categoryId=2;
    });
    document.querySelector(".gallery").innerHTML="";
    genererProjets(projetsFiltrees);
});
btnHotels.addEventListener("click",function(){
    const projetsFiltrees = works.filter(function(projet){
        return projet.categoryId = 3;
    });
    document.querySelector(".gallery").innerHTML="";
    genererProjets(projetsFiltrees);
});

