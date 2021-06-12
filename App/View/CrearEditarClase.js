class CrearEditarClase{
  
  crearClase(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearClase', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Clase creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarClase(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/modificarClase', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Clase modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}