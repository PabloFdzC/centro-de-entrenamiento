class NuevoAdministrador {
  enviarCorreo(info){
    console.log(info);
    console.log(Array.from(info));
    ajaxCall('/nuevoAdministrador', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "La contraseña del nuevo administrador es: ");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "No se pudo crear el administrador");
    });
  }
}