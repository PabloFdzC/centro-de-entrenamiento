const TransaccionServicioSala = require("./TransaccionServicioSala.js");

class ControllerServicioSala{
  #transaccionServicioSala = null;
  #ctrlServicio = null;

  constructor(ctrlServicio){
    this.#ctrlServicio = ctrlServicio;
    this.#transaccionServicioSala = new TransaccionServicioSala();
  }

  async agregarMultiples(elem){
    var agregar = [];
    for(let i = 0; i < elem.servicios.length; i++){
      var valor = [elem.idSala, elem.servicios[i]];
      agregar.push(valor);
    }
    if(agregar.length > 0){
      var r = await this.#transaccionServicioSala.agregarMultiples(agregar);
      return r;
    }
    return null;
  }

  async eliminarMultiples(elem){
    var eliminar = [];
    for(let i = 0; i < elem.serviciosE.length; i++){
      var valor = [elem.idSala, elem.serviciosE[i]];
      eliminar.push(valor);
    }
    if(eliminar.length > 0){
      var r = await this.#transaccionServicioSala.eliminarMultiples(eliminar);
      return r;
    }
    return null;
  }
  
  async mostrarTodosXIdSala(id){
    var result = await this.#transaccionServicioSala.mostrarTodosXIdSala(id);
    var listaserviciosresult = result[0];
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

}

module.exports = ControllerServicioSala;