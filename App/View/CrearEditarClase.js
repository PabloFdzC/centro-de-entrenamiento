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
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarClase(info){

  }

  mostrarListadoServicios(){
    var servicios;
    ajaxCall('/mostrarServicios', 'GET', {}, function(s){
      servicios = s;
    }, function(xhr, status, error){
      console.log(xhr);
    });
    return servicios;
  }

}