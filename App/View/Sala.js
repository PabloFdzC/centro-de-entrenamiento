class Sala{

  constructor(){}

  crearSala(info, listaServicios, calendario){
    info.append("servicios", JSON.stringify(listaServicios));
    info.append("calendario", JSON.stringify(calendario));
    let i = Utilidades.convertirAJSON(info);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/crearSala', 'POST', i, function(r){
        muestraMensaje("Exito", "Sala creada con éxito");
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  modificarSala(info, listaServiciosE, listaServiciosA, calendarioE, calendarioA){
    info.append("serviciosA", JSON.stringify(listaServiciosA));
    info.append("calendarioA", JSON.stringify(calendarioA));
    info.append("serviciosE", JSON.stringify(listaServiciosE));
    info.append("calendarioE", JSON.stringify(calendarioE));
    let i = Utilidades.convertirAJSON(info);
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/modificarSala', 'POST', i, function(r){
        muestraMensaje("Exito", "Sala modificada con éxito");
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  mostrarSala(datos){
    return new Promise(function(resolve, reject) {
      let s = '/mostrarSala'+Utilidades.objetoAParametrosGet(datos);
      Utilidades.ajaxCall(s, 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  mostrarSalas(){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarSalas', 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  mostrarSalasSimple(){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarSalasSimple', 'GET', {}, function(r){
        resolve(r);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

}