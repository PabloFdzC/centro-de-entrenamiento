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

  async matricularClase(info){
    let i = JSON.stringify(info);
    return await Utilidades.ajaxCall('/matricularClase', 'POST', i, "Matriculado correctamente");
  }

  async desmatricularClase(info){
    let i = JSON.stringify(info);
    return await Utilidades.ajaxCall('/desmatricularClase', 'POST', i, "Desmatriculado correctamente");
  }

  async mostrarClasesAutorizadas(){
    return await Utilidades.ajaxCall('/mostrarClasesAutorizadas', 'GET', {});
  }

  async mostrarClasesEnEspera(){
    return await Utilidades.ajaxCall('/mostrarClasesEnEspera', 'GET', {});
  }

  async publicarTodas(clases){
    let info = {clases:JSON.stringify(clases)};
    let i = JSON.stringify(info);
    return await Utilidades.ajaxCall('/publicarTodasClases', 'POST', i, "Clases publicadas con éxito");
  }

  async publicarClase(idClase){
    let i = JSON.stringify({idClase});
    return await Utilidades.ajaxCall('/publicarClase', 'POST', i, "Clase publicada con éxito");
  }

  async eliminarClaseEnJornada(id){
    let i = JSON.stringify({idClaseJornada:id});
    return await Utilidades.ajaxCall('/eliminarClaseJornada', 'POST', i, "La clase se eliminó de esta jornada");
  }

  async eliminar(idClase){
    let i = JSON.stringify({idClase});
    return await Utilidades.ajaxCall('/eliminarClase', 'POST', i, "Clase eliminada con éxito");
  }

  async marcarVistasInstructor(clases){
    let info = {clases:JSON.stringify(clases)};
    let i = JSON.stringify(info);
    return await Utilidades.ajaxCall('/marcarVistasInstructor', 'POST', i);
  }

}