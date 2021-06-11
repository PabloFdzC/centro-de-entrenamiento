class Servicios{
  
  crearServicio(info){
    ajaxCall('/crearServicio', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Servicio creado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarServicio(info){
    ajaxCall('/modificarServicio', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Servicio modificado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarListadoServicios(esLista){
    var res = null;
    ajaxCall('/mostrarServicios/'+esLista, 'GET', {}, function(r){
      res = r;
      console.log("resultado:");
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    return res;
  }
}