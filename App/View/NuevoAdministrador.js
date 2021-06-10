class NuevoAdministrador {
  enviarCorreo(info){
    console.log(info);
    console.log(Array.from(info));
    ajaxCall('/nuevoAdministrador', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }
}