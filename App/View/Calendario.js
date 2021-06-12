class Calendario{
  
  mostrarClasesPorMes() {
    Utilidades.ajaxCall('/mostrarClasesPorMes', 'GET', {}, function(calendario){
      
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarListadoReservas(){
    Utilidades.ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarClase(){
    Utilidades.ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
  
}