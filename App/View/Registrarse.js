class Registrarse{

  async registrarCliente(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/crearCliente', 'POST', i, "Cuenta creada con éxito");
  }

}