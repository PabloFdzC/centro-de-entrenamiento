class Registrarse{

  registrarse(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearCliente', 'POST', i, function(r){
      muestraMensaje("Exito", "Cuenta creada con éxito");
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}