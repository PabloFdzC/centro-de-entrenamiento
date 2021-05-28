Persona = require('Persona.js');

class Instructor extends Persona{

  #servicios;

  constructor(primerNombre, segundoNombre, primerApellido, segundoApellido,
    fechaNacimiento, telefono, email, identificacion, servicios){
    super(primerNombre, segundoNombre, primerApellido, segundoApellido,
      fechaNacimiento, telefono, email, identificacion);
    this.#servicios = servicios;
  }

  getServicios(){
    return this.#servicios;
  }

  setServicios(servicios){
    this.#servicios = servicios;
  }

}

module.exports = Instructor;