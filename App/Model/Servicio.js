class Servicio {
  
  #nombre = null;
  #costoMatricula = null;

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

  convertirAVista(){
    var obj = {
      nombre: this.#nombre,
      costoMatricula:this.#costoMatricula
    }
    return obj;
  }

}

module.exports = Servicio;