class Calendario{

  async mostrarCalendario(datos) {
    let s = '/mostrarCalendario'+Utilidades.objetoAParametrosGet(datos);
    return await Utilidades.ajaxCall(s, 'GET', {});
  }

  async mostrarListadoReservas(idClase){
    return await Utilidades.ajaxCall('/mostrarPersonasMatriculadas?idClase='+idClase, 'GET', {});
  }

  async mostrarClasesJornada(info){
    let s = Utilidades.objetoAParametrosGet(info);
    return await Utilidades.ajaxCall('/mostrarClasesJornada'+s, 'GET', {});
  }
  
}