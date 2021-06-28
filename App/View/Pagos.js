class Pagos{

  async mostrarPendientes(){
    return await Utilidades.ajaxCall('/mostrarPendientes', 'GET', {});
  }

  async realizarPago(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/realizarPago', 'POST', i, "Pago realizado con éxito");
  }
  
}