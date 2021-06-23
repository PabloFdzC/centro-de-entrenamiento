class Servicios{
  
  async crearServicio(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/crearServicio', 'POST', i, "Servicio creado con éxito");
  }

  async modificarServicio(info){
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarServicio', 'POST', i, "Servicio modificado con éxito");
  }

  async eliminarServicio(nombreServicio){
    var d = JSON.stringify({nombreServicio});
    return await Utilidades.ajaxCall('/eliminarServicio', 'POST', d, "Servicio eliminado con éxito");
  }

  async mostrarListadoServicios(esLista){
    return await Utilidades.ajaxCall('/mostrarServicios?esLista='+esLista, 'GET', {});
  }
}