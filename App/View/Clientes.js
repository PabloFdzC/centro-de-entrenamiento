class Clientes{

  verClientes(){
    var res = null;
    ajaxCall('/mostrarClientes', 'GET', {}, function(html){
      res = html;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    return res;
  }

}