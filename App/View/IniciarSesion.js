class IniciarSesion{
  
  iniciarSesion(info){
    ajaxCall('/iniciarSesion', 'POST', info, function(u){
      localStorage.setItem("email", u);  
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

}