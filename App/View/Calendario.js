class Calendario{
  
  mostrarClasesPorMes(funcExito, funcError) {
    ajaxCall('/mostrarClasesPorMes', 'GET', {}, function(calendario){
      
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarListadoReservas(funcExito, funcError){
    ajaxCall('/mostrarReservas', 'GET', {}, function(reservas){

    }, function(xhr, status, error){
      console.log(xhr);
    });
  }
  
}