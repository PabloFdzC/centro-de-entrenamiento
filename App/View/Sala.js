class Sala{

  constructor(){}

  crearSala(info){
    ajaxCall('/crearSala', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala creada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "Datos modificados con éxito");
    });
  }

  modificarSala(info){
    ajaxCall('/modificarSala', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Sala modificada con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarSala(){
    ajaxCall('/mostrarSala', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "No se puede mostrar la sala");
    });
    
  }

}