class Clientes{

  async verClientes(){
    return await Utilidades.ajaxCall('/mostrarClientes', 'GET', {});
  }

  async mostrarCliente(email){
    return await Utilidades.ajaxCall('/mostrarCliente?email='+email, 'GET', {});
  }

}