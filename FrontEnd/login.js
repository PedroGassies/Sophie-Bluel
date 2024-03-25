
/****************** LOG IN  ************************/
function connect() {
  errorMessage.style.visibility="hidden";
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
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
  .catch(error=>{
    console.log(error);
    let errorMessage = document.getElementById('errorMessage');
  errorMessage.style.visibility="visible";
  errorMessage.style.color = 'red'; 

  });

  const token = window.localStorage.getItem('token');
if(token){
  window.location.href='index.html';
}
console.log("test");
 };



const btnConnect=document.querySelector(".connect");
btnConnect.addEventListener("submit",function(e){
  e.preventDefault();
  connect();
})

