class Registrarse{

  registrarse(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearCliente', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Cuenta creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}