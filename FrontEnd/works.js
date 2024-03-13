const reponse = await fetch ("http://localhost:5678/api/works").then(works => works.json());

function genererProjets(works){
    for (let i = 0; i< works.length; i++){
        const figure = works[i];
    }
}