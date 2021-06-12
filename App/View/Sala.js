class Sala{

  constructor(){}

  crearSala(info, listaServicios, calendario){
    info.append("servicios", JSON.stringify(listaServicios));
    info.append("calendario", JSON.stringify(calendario));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearSala', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarSala(info, listaServiciosE, listaServiciosA, calendarioE, calendarioA){
    info.append("serviciosA", JSON.stringify(listaServiciosA));
    info.append("calendarioA", JSON.stringify(calendarioA));
    info.append("serviciosE", JSON.stringify(listaServiciosE));
    info.append("calendarioE", JSON.stringify(calendarioE));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/modificarSala', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarSala(){
    Utilidades.ajaxCall('/mostrarSala', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    
  }

  mostrarSalas(){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarSalas', 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

}