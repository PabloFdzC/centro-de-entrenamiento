class Servicios{
  
  crearServicio(info){
    ajaxCall('/crearServicio', 'POST', info, function(d){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  modificarServicio(info){
    ajaxCall('/modificarServicio', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarListadoServicios(info){
    ajaxCall('/mostrarServicios', 'POST', info, function(r){
      $('#body').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }
}