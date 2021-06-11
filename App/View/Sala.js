class Sala{

  constructor(){}

  crearSala(info){
    ajaxCall('/crearSala', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarSala(info){
    ajaxCall('/modificarSala', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarSala(){
    ajaxCall('/mostrarSala', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    
  }

  mostrarSalas(){
    /*ajaxCall('/mostrarSalas', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });*/
  }

}