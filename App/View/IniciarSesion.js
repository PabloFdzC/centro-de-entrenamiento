class IniciarSesion{
  
  iniciarSesion(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/iniciarSesion', 'POST', i, function(u){
      window.location.href = "/Calendario";
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}