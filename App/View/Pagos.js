class Pagos{

  mostrarPendientes(){
    var res = null;
    ajaxCall('/mostrarPendientes', 'POST', info, function(html){
      res = html;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    return res;
  }

  confirmarPago(){
    ajaxCall('/realizarPago', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Pago realizado con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }
  
}