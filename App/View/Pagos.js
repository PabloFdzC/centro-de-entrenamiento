class Pagos{

  mostrarPendientes(){
    ajaxCall('/mostrarPendientes', 'POST', info, function(html){
      $('#body').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

  confirmarPago(){
    ajaxCall('/realizarPago', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }
  
}