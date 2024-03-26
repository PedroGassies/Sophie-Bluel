
export function ifToken(){
    if(localStorage.getItem('token')){
      document.getElementById('modeEditeur').style.visibility = "visible";
      document.getElementById('log').innerHTML = '<a href="login.html" id="logout">logout';
      btnProjets.style.visibility="hidden";
      btnObjets.style.visibility="hidden";
      btnAppartements.style.visibility="hidden";
      btnHotels.style.visibility="hidden";
    }
  }