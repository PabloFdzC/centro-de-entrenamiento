const TransaccionServicioSala = require("./TransaccionServicioSala.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerServicioSala{
  #transaccionServicioSala = null;

  constructor(){
    this.#transaccionServicioSala = new TransaccionServicioSala();
  }

  async agregarMultiples(elem){
    var agregar = [];
    for(let i = 0; i < elem.servicios.length; i++){
      var valor = [elem.idSala, elem.servicios[i]];
      agregar.push(valor);
    }
    var r = await this.#transaccionServicioSala.agregarMultiples(agregar);
    return r;
  }

  async eliminarMultiples(elem){
    var eliminar = [];
    for(let i = 0; i < elem.serviciosE.length; i++){
      var valor = [elem.idSala, elem.serviciosE[i]];
      eliminar.push(valor);
    }
    var r = await this.#transaccionServicioSala.eliminarMultiples(eliminar);
    return r;
  }
  
  async mostrarTodosXIdSala(id){
    var result = await this.#transaccionServicioSala.mostrarTodosXIdSala(id);
    var listaserviciosresult = result[0];
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

module.exports = ControllerServicioSala;