class Pagos{

  async mostrarPendientes(){
    return new Promise(function(resolve, reject) {
      let i = Utilidades.convertirAJSON(info);
      Utilidades.ajaxCall('/mostrarPendientes', 'POST', i, function(html){
        resolve(html);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        reject(null);
      });
    });
  }

  confirmarPago(){
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/realizarPago', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Pago realizado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
  
}