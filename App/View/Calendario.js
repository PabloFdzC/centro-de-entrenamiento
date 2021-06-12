class Calendario{

  async mostrarJornadasDelMesI(datos) {
    console.log(JSON.stringify(datos));
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarJornadasDelMesI', 'POST', JSON.stringify(datos), function(jornadasDelMes){
        resolve(jornadasDelMes);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }
  
  async mostrarJornadasDelMes(mes) {
    mes++;
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarJornadasDelMes/'+mes, 'GET', {}, function(jornadasDelMes){
        resolve(jornadasDelMes);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

  async mostrarListadoReservas(idClase){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarReservas/'+idClase, 'GET', {}, function(reservas){
        resolve(reservas);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

  async mostrarClase(idClase){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarClase/'+idClase, 'GET', {}, function(clase){
        resolve(clase);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }
  
}