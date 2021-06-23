class NuevoAdministrador {
  async enviarCorreo(info){
    //console.log(Array.from(info));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/nuevoAdministrador', 'POST', i);
  }
}