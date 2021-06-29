const ArreglaFechas = require('../Controller/ArreglaFechas.js');

Persona = require('./Persona.js');

class Instructor extends Persona{

  #servicios = null;
  #clasesAutorizadas = [];

  constructor(primerNombre, segundoNombre, primerApellido, segundoApellido,
    fechaNacimiento, telefono, email, identificacion, servicios, clasesAutorizadas=[]){
    super(primerNombre, segundoNombre, primerApellido, segundoApellido,
      fechaNacimiento, telefono, email, identificacion);
    this.#servicios = servicios;
    this.#clasesAutorizadas = clasesAutorizadas;
  }

  getServicios(){
    return this.#servicios;
  }

  setServicios(servicios){
    this.#servicios = servicios;
  }

  getClasesAutorizadas(){
    return this.#clasesAutorizadas;
  }

  setClasesAutorizadas(clasesAutorizadas){
    this.#clasesAutorizadas = clasesAutorizadas;
  }

  actualizar(clase, elimina){
    console.log("SI");
    if(elimina){
      let i = this.#clasesAutorizadas.indexOf(clase);
      if (i > -1) {
        this.#clasesAutorizadas.splice(i, 1);
      }
    } else {
      if(clase.getVistoPorInstructor() === 0 && !this.#clasesAutorizadas.includes(clase)){
        this.#clasesAutorizadas.push(clase);
      }
    }
  }

  convertirAVista(){
    var obj = {
      primerNombre:this.primerNombre,
      segundoNombre:this.segundoNombre,
      primerApellido:this.primerApellido,
      segundoApellido:this.segundoApellido,
      fechaNacimiento:ArreglaFechas.fechaAString(this.fechaNacimiento),
      telefono:this.telefono,
      email:this.email,
      identificacion:this.identificacion
    }
    var a = [];
    if(Array.isArray(this.#servicios)){
      for(let s of this.#servicios){
        a.push(s.getNombre());
      }
    }
    obj.servicios = a;
    return obj;
  }
}

module.exports = Instructor;