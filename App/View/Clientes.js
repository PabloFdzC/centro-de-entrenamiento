class Clientes{

  async verClientes(){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarClientes', 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  async mostrarCliente(email){
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarCliente?email='+email, 'GET', {}, function(c){
        resolve(c);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

}