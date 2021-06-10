class Clientes{

  verClientes(){
    ajaxCall('/mostrarClientes', 'GET', {}, function(html){
      $('#body').append(html);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

}