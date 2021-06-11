class CrearEditarClase{
  
  crearClase(info){
    ajaxCall('/crearClase', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Clase creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarClase(info){
    ajaxCall('/modificarClase', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Clase modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

}