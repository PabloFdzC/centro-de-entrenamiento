class Sala{

  constructor(){}

  async crearSala(info, listaServicios, calendario){
    info.append("servicios", JSON.stringify(listaServicios));
    info.append("calendario", JSON.stringify(calendario));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/crearSala', 'POST', i, "Sala creada con éxito");
  }

  async modificarSala(info, listaServiciosE, listaServiciosA, calendarioE, calendarioA){
    info.append("servicios", JSON.stringify(listaServiciosA));
    info.append("calendario", JSON.stringify(calendarioA));
    info.append("serviciosE", JSON.stringify(listaServiciosE));
    info.append("calendarioE", JSON.stringify(calendarioE));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarSala', 'POST', i, "Sala modificada con éxito");
  }

  async mostrarSala(datos){
    let s = '/mostrarSala'+Utilidades.objetoAParametrosGet(datos);
    return await Utilidades.ajaxCall(s, 'GET', {});
  }

  async mostrarSalas(){
    return await Utilidades.ajaxCall('/mostrarSalas', 'GET', {});
  }

  async mostrarSalasSimple(){
    return await Utilidades.ajaxCall('/mostrarSalasSimple', 'GET', {});
  }

}