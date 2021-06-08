class Sala {
  
  #id
  #capacidad;
  #aforo;
  #costoMatricula;
  #calendario;
  #servicios;

  constructor(id, capacidad, aforo, costoMatricula, calendario, servicios){
    this.#id = id;
    this.#capacidad = capacidad;
    this.#aforo = aforo;
    this.#costoMatricula = costoMatricula;
    this.#calendario = calendario;
    this.#servicios = servicios;
  }

  getId(){
    return this.#id;
  }

  setId(id){
    this.#id = id;
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