/*let token = window.localStorage.getItem('token');
if(token === null){
    //Collect token from API
const reponse = await fetch("http://localhost:5678/api/users/login");
token= await reponse.json();

 //Transforming token into JSON
const valeurToken= JSON.stringify(token);
 //Stocking in LocalStorage
window.localStorage.setItem("token",valeurToken);
}else{
token = json.parse(token);
}
/****************** LOG IN  ************************/
export function connect() {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const email=document.querySelector("#email");
const password=document.Queryselector("#password");
const raw = JSON.stringify({
  "email": email,
  "password": password 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:5678/api/users/login/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
 };

