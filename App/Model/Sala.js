class Sala {
  
  #capacidad;
  #aforo;
  #costoMatricula;
  #calendario;
  #servicios;

  constructor(capacidad, aforo, costoMatricula, calendario, servicios){
    this.#capacidad = capacidad;
    this.#aforo = aforo;
    this.#costoMatricula = costoMatricula;
    this.#calendario = calendario;
    this.#servicios = servicios;
  }

  getCapacidad(){
    return this.#capacidad;
  }

  setCapacidad(capacidad){
    this.#capacidad = capacidad;
  }

  getAforo(){
    return this.#aforo;
  }

  setAforo(aforo){
    this.#aforo = aforo;
  }

  getCostoMatricula(){
    return this.#costoMatricula;
  }

  setCostoMatricula(costoMatricula){
    this.#costoMatricula = costoMatricula;
  }

  getCalendario(){
    return this.#calendario;
  }

  setCalendario(calendario){
    this.#calendario = calendario;
  }

  getServicios(){
    return this.#servicios;
  }

  setServicios(servicios){
    this.#servicios = servicios;
  }

  calcularCapacidad(){
    return parseInt(this.#capacidad * this.#aforo, 10);
  }
  
}

module.exports = Sala;