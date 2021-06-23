const TransaccionServicioInstructor = require("./TransaccionServicioInstructor.js");

class ControllerServicioInstructor{
  #transaccionServicioInstructor = null;
  #ctrlServicio = null;
  
  constructor(ctrlServicio){
    this.#ctrlServicio = ctrlServicio;
    this.#transaccionServicioInstructor = new TransaccionServicioInstructor();
  }

  async mostrarTodosXEmail(email){
    var listaserviciosresult = await this.#transaccionServicioInstructor.mostrarTodosXEmail(email);
    var i;
    var listaServicios = [];
    for(i = 0; i < listaserviciosresult.length; i++){
      var servicioresult = listaserviciosresult[i];
      var servicio = this.#ctrlServicio.agregaMemoria({
        nombre:servicioresult.nombre_servicio,
        costoMatricula:servicioresult.costo_matricula
      });
      listaServicios.push(servicio);
    }
    return listaServicios;
  }

  async agregarMultiples(elem){
    var agregarL = [];
    for(let i = 0; i < elem.servicios.length; i++){
      var value = [elem.email, elem.servicios[i]];
      agregarL.push(value);
    }
    if(agregarL.length > 0){
      var result = await this.#transaccionServicioInstructor.agregarMultiples(agregarL);
      return result;
    }
    return null;
  }

  async eliminarMultiples(elem){
    var eliminarL = [];
    for(let i = 0; i < elem.serviciosE.length; i++){
      var value = [elem.email, elem.serviciosE[i]];
      eliminarL.push(value);
    }
    if(eliminarL.length > 0){
      var result = await this.#transaccionServicioInstructor.eliminarMultiples(eliminarL);
      return result;
    }
    return null;
  }
}

module.exports = ControllerServicioInstructor;