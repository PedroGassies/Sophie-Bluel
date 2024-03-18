
/****************** LOG IN  ************************/
export function connect() {
    const formulaireLogIn = document.querySelector(".connect");
    formulaireLogIn.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const logIn = {
        utilisateur: event.target.querySelector("[name=email").value,
        commentaire: event.target.querySelector("[name=password]").value,
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(logIn);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:5678/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
    
 };