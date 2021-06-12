class Servicios{
  
  crearServicio(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearServicio', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Servicio creado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarServicio(info){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/modificarServicio', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Servicio modificado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  async mostrarListadoServicios(esLista){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarServicios/'+esLista, 'GET', {}, function(r){
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(null);
      });
    });
  }
}