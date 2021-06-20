class Clase{
  
  crearClase(info){
    let i = Utilidades.convertirAJSON(info);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/crearClase', 'POST', i, function(r){
        muestraMensaje("Exito", "Clase creada con éxito");
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  modificarClase(info){
    let i = Utilidades.convertirAJSON(info);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/modificarClase', 'POST', i, function(r){
        muestraMensaje("Exito", "Clase modificada con éxito");
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  async mostrarClase(idClase){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarClase?idClase='+idClase, 'GET', {}, function(clase){
        resolve(clase);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

}