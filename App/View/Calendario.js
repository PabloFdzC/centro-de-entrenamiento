class Calendario{

  async mostrarCalendario(datos) {
    let s = '/mostrarCalendario'+Utilidades.objetoAParametrosGet(datos);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall(s, 'GET', {}, function(r){
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  async mostrarListadoReservas(idClase){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarPersonasMatriculadas?idClase='+idClase, 'GET', {}, function(reservas){
        resolve(reservas);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  async mostrarClasesJornada(info){
    let s = Utilidades.objetoAParametrosGet(info);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarClasesJornada'+s, 'GET', {}, function(clases){
        resolve(clases);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }
  
}