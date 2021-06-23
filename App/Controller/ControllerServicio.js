const TransaccionServicio = require("./TransaccionServicio.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerServicio{
  #transaccionServicio = null;
  #servicios = null;
  
  constructor(){
    this.#transaccionServicio = new TransaccionServicio();
    this.#servicios = {};
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
      var servicio = this.agregaMemoria({
        nombre:servicioresult.nombre_servicio,
        costoMatricula:servicioresult.costo_matricula
      });
      listaServicios.push(servicio);
    }
    return listaServicios;
  }

  agregaMemoria(elem = {nombre:null,costoMatricula:null}){
    if(!(elem.nombre in this.#servicios)){
      this.#servicios[elem.nombre] = new Servicio(
        elem.nombre,
        elem.costoMatricula);
    } else {
      let s = this.#servicios[elem.nombre];
      if(elem.costoMatricula != null && s.getCostoMatricula() != elem.costoMatricula){
        s.setCostoMatricula(elem.costoMatricula);
      }
    }
    return this.#servicios[elem.nombre];
  }

}

module.exports = ControllerServicio;