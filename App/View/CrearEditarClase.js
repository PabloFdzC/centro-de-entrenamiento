class CrearEditarClase{
  
  crearClase(info){
    ajaxCall('/matricularClase', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  modificarClase(info){
    ajaxCall('/modificarClase', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Clase modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

}