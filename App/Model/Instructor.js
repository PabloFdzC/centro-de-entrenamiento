Persona = require('./Persona.js');

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

  convertirAJSONString(){
    var obj = {
      primerNombre:this.primerNombre,
      segundoNombre:this.segundoNombre,
      primerApellido:this.primerApellido,
      segundoApellido:this.segundoApellido,
      fechaNacimiento:this.fechaNacimiento,
      telefono:this.telefono,
      email:this.email,
      identificacion:this.identificacion
    }
    var a = [];
    console.log(this.#servicios);
    for(let s of this.#servicios){
      a.push(s.getNombre());
    }
    obj.servicios = a;
    return JSON.stringify(obj);
  }
}

module.exports = Instructor;