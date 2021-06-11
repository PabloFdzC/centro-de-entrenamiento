class Calendario{
  
  mostrarClasesPorMes() {
    ajaxCall('/mostrarClasesPorMes', 'GET', {}, function(calendario){
      
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarListadoReservas(){
    ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarClase(){
    ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
  
}