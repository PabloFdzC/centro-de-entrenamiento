class Instructores{

  async crearInstructor(info, listaServicios){
    info.append("servicios", JSON.stringify(listaServicios));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/crearInstructor', 'POST', i);
  }

  async modificarInstructor(info, listaServiciosA=[], listaServiciosE=[]){
    console.log(listaServiciosA);
    console.log(listaServiciosE);
    info.append("servicios", JSON.stringify(listaServiciosA));
    info.append("serviciosE", JSON.stringify(listaServiciosE));
    let i = Utilidades.convertirAJSON(info);
    return await Utilidades.ajaxCall('/modificarInstructor', 'POST', i, "Instructor modificado con éxito");
  }

  async mostrarInstructor(email){
    return await Utilidades.ajaxCall('/mostrarInstructor?email='+email, 'GET', {});
  }

  async mostrarListadoInstructores(esLista){
    return await Utilidades.ajaxCall('/mostrarInstructores?esLista='+esLista, 'GET', {});
  }

  async eliminarInstructor(email){
    var d = JSON.stringify({email});
    return await Utilidades.ajaxCall('/eliminarInstructor', 'POST', d, "Se eliminó el instructor");
  }

}