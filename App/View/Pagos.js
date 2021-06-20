class Pagos{

  async mostrarPendientes(){
    let email = localStorage.getItem('email');
    return new Promise(function(resolve, reject) {
      Utilidades.ajaxCall('/mostrarPendientes?email='+email, 'GET', i, function(html){
        resolve(html);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        reject(xhr);
      });
    });
  }

  realizarPago(){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/realizarPago', 'POST', i, function(r){
      muestraMensaje("Exito", "Pago realizado con éxito");
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
  
}