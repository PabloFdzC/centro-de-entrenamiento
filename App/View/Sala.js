class CrearEditarSala{

  crearSala(info){
    ajaxCall('/crearSala', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  modificarSala(info){
    ajaxCall('/modificarSala', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  mostrarSala(){
    ajaxCall('/mostrarSala', 'GET', {}, function(html){
      $('#sala').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
    });
    
  }

}