class Pagos{

  async mostrarPendientes(){
    let email = localStorage.getItem('email');
    return await Utilidades.ajaxCall('/mostrarPendientes?email='+email, 'GET', i);
  }

  async realizarPago(){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/realizarPago', 'POST', i, "Pago realizado con éxito");
  }
  
}