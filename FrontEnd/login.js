/** LOG IN  **/
document.addEventListener('DOMContentLoaded', function () {
  const btnConnect = document.getElementById('connect');
  if (btnConnect) {
    btnConnect.addEventListener("submit", function (e) {
      e.preventDefault();
      connect();
    });
  }
});



function connect() {
  errorMessage.style.visibility = "hidden";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
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
    .then((response) => response.json())
    .then((result) => {
      console.log(result.token)
      if (result.token) {
        const token = window.localStorage.setItem('token', result.token);
        window.location.href = 'index.html';
      }
      else {
        notFound()
      }
    })
    .catch(error => {
      console.log(error);
      notFound()

    });
};

function notFound() {
  let errorMessage = document.getElementById('errorMessage');
  errorMessage.style.visibility = "visible";
  errorMessage.style.color = 'red';
};




