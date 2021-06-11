class NuevoAdministrador {
  enviarCorreo(info){
    console.log(info);
    console.log(Array.from(info));
    ajaxCall('/nuevoAdministrador', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "La contraseña del nuevo administrador es: "+r.contrasenna);
    }, function(xhr, status, error){
      console.log(xhr);
      console.log(status);
      console.log(error);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
}