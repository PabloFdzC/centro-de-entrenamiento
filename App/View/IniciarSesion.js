class IniciarSesion{
  
  async iniciarSesion(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/ingresar', 'POST', i, "", "/Calendario");
  }

}