class NuevoAdministrador {
  enviarCorreo(info){
    //console.log(Array.from(info));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/nuevoAdministrador', 'POST', i, function(r){
      muestraMensaje("Exito", "La contraseña del nuevo administrador es: "+r.contrasenna);
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
}