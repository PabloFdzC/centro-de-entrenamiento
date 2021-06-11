class Registrarse{

  registrarse(info){
    ajaxCall('/crearCliente', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Cuenta creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}