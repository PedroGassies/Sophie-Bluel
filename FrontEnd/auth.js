
export function ifToken(){
    if(localStorage.getItem('token')){
      document.getElementById('modeEditeur').style.visibility = "visible";
      document.getElementById('log').innerHTML = '<a href="login.html" id="logout">logout';
    document.querySelector(".btnProjects").style.visibility = "hidden";
    document.querySelector(".btnObjects").style.visibility = "hidden";
    document.querySelector(".btnAppartments").style.visibility = "hidden";
    document.querySelector(".btnHostels").style.visibility = "hidden";
    
  }
}