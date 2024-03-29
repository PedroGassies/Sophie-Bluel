
export function ifToken(){
    if(localStorage.getItem('token')){
      document.getElementById('headEdit').style.visibility = "visible";
      document.querySelector('.js-modal').style.visibility = "visible";
      document.querySelector('.index').style.margin='15px';
      document.getElementById('log').innerHTML = '<a href="login.html" id="log">logout';
    document.querySelector(".btnProjects").style.visibility = "hidden";
    document.querySelector(".btnObjects").style.visibility = "hidden";
    document.querySelector(".btnAppartments").style.visibility = "hidden";
    document.querySelector(".btnHostels").style.visibility = "hidden";
    
  }
}