class IniciarSesion{
  
  iniciarSesion(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/iniciarSesion', 'POST', i, function(u){
      localStorage.setItem("email", u.email);  
      localStorage.setItem("tipo", u.tipo_usuario);
      window.location.href = "/Calendario/"+u.tipo_usuario;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "Datos erroneos");
    });
  }

}