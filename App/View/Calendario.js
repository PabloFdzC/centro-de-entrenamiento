class Calendario{
  
  mostrarClasesPorMes() {
    ajaxCall('/mostrarClasesPorMes', 'GET', {}, function(calendario){
      
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarListadoReservas(){
    ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarClase(){
    ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
    });
  }
  
}