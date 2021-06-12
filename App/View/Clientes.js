class Clientes{

  async verClientes(){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarClientes', 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

  async mostrarCliente(email){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarCliente/'+email, 'GET', {}, function(c){
        resolve(c);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

}