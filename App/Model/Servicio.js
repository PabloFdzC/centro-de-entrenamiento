class Servicio {
  
  #nombre;
  #costoMatricula;

  constructor(nombre, costoMatricula){
    this.#nombre = nombre;
    this.#costoMatricula = costoMatricula;
  }

  getNombre(){
    return this.#nombre;
  }

  setNombre(nombre){
    this.#nombre = nombre;
  }

  getCostoMatricula(){
    return this.#costoMatricula;
  }

  setCostoMatricula(costoMatricula){
    this.#costoMatricula = costoMatricula;
  }

}

module.exports = Servicio;