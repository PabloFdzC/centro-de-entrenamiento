class Sala{

  constructor(){}

  crearSala(info, listaServicios, calendario){
    let i = Utilidades.convertirAJSON(info);
    i.servicios = listaServicios;
    i.calendario = calendario;
    Utilidades.ajaxCall('/crearSala', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarSala(info, listaServicios, calendario){
    let i = Utilidades.convertirAJSON(info);
    i.servicios = listaServicios;
    i.calendario = calendario;
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
    /*Utilidades.ajaxCall('/mostrarSalas', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });*/
  }

}