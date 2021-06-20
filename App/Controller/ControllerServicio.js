const TransaccionServicio = require("./TransaccionServicio.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerServicio{
  #transaccionServicio = null;
  
  constructor(){
    this.#transaccionServicio = new TransaccionServicio();
  }

  async agregar(elem){
    var result = await this.#transaccionServicio.agregar(elem);
    return result;
  }

  async modificar(elem){
    var result = await this.#transaccionServicio.modificar(elem);
    return result;
  }

  async eliminar(elem){
    var result = await this.#transaccionServicio.eliminar(elem);
    return result;
  }

  async mostrarTodos(){
    var listaserviciosresult = await this.#transaccionServicio.mostrarTodos();
    var i;
    var listaServicios = [];
    for(i = 0; i < listaserviciosresult.length; i++){
      var servicioresult = listaserviciosresult[i];
      var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
      listaServicios.push(servicio);
    }
    return listaServicios;
  }

}

module.exports = ControllerServicio;