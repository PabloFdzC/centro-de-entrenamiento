class IniciarSesion{
  
  iniciarSesion(info){
    ajaxCall('/iniciarSesion', 'POST', info, function(u){
      localStorage.setItem("email", u.email);  
      localStorage.setItem("tipo", u.tipo_usuario);
      window.location.href = "/Calendario/"+u.tipo_usuario;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "Datos erroneos");
    });
  }

}