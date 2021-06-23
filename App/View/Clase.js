class Clase{
  
  async crearClase(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/crearClase', 'POST', i, "Clase creada con éxito");
  }

  async modificarClase(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarClase', 'POST', i, "Clase modificada con éxito");
  }

  async mostrarClase(idClase){
    return await Utilidades.ajaxCall('/mostrarClase?idClase='+idClase, 'GET', {});
  }

}