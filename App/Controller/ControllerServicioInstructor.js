const TransaccionServicioInstructor = require("./TransaccionServicioInstructor.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerServicioInstructor{
  #transaccionServicioInstructor = null;
  
  constructor(){
    this.#transaccionServicioInstructor = new TransaccionServicioInstructor();
  }

  async mostrarTodosXEmail(email){
    var listaserviciosresult = await this.#transaccionServicioInstructor.mostrarTodosXEmail(email);
    var i;
    var listaServicios = [];
    for(i = 0; i < listaserviciosresult.length; i++){
      var servicioresult = listaserviciosresult[i];
      var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
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
    var result = await this.#transaccionServicioInstructor.agregarMultiples(agregarL);
    return result;
  }

  async eliminarMultiples(elem){
    var eliminarL = [];
    for(let i = 0; i < elem.serviciosE.length; i++){
      var value = [elem.email, elem.serviciosA[i]];
      eliminarL.push(value);
    }
    var result = await this.#transaccionServicioInstructor.eliminarMultiples(eliminarL);
    return result;
  }
}

module.exports = ControllerServicioInstructor;