OperacionesAdministrador = require('./OperacionesAdministrador.js');
OperacionesPago = require('./OperacionesPago.js');
OperacionesSala = require('./OperacionesSala.js');
OperacionesServicios = require('./OperacionesServicios.js');
OperacionesInstructor = require('./OperacionesInstructor.js');
OperacionesClase = require('./OperacionesClase.js');
OperacionesUsuario = require('./OperacionesUsuario.js');
OperacionesCliente = require('./OperacionesCliente.js');

class OperacionesSng{
  static #instance = null;
  #operacionesAdministrador;
  #operacionesPago;
  #operacionesSala;
  #operacionesServicios;
  #operacionesInstructor;
  #operacionesClase;
  #operacionesUsuario;
  #operacionesCliente;

  constructor(){
    this.#operacionesAdministrador = null;
    this.#operacionesPago = null;
    this.#operacionesSala = null;
    this.#operacionesServicios = null;
    this.#operacionesInstructor = null;
    this.#operacionesClase = null;
    this.#operacionesUsuario = null;
    this.#operacionesCliente = null;
  }
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new OperacionesSng();
    }
    return this.#instance;
  }

  getOperacionesAdministrador(){
    if(this.#operacionesAdministrador == null){
      this.#operacionesAdministrador = OperacionesAdministrador;
    }
    return this.#operacionesAdministrador;
  }

  getOperacionesPago(){
    if(this.#operacionesPago == null){
      this.#operacionesPago = OperacionesPago;
    }
    return this.#operacionesPago;
  }

  getOperacionesSala(){
    if(this.#operacionesSala == null){
      this.#operacionesSala = OperacionesSala;
    }
    return this.#operacionesSala;
  }

  getOperacionesServicios(){
    if(this.#operacionesServicios == null){
      this.#operacionesServicios = OperacionesServicios;
    }
    return this.#operacionesServicios;
  }

  getOperacionesInstructor(){
    if(this.#operacionesInstructor == null){
      this.#operacionesInstructor = OperacionesInstructor;
    }
    return this.#operacionesInstructor;
  }

  getOperacionesClase(){
    if(this.#operacionesClase == null){
      this.#operacionesClase = OperacionesClase;
    }
    return this.#operacionesClase;
  }

  getOperacionesUsuario(){
    if(this.#operacionesUsuario == null){
      this.#operacionesUsuario = OperacionesUsuario;
    }
    return this.#operacionesUsuario;
  }

  getOperacionesCliente(){
    if(this.#operacionesCliente == null){
      this.#operacionesCliente = OperacionesCliente;
    }
    return this.#operacionesCliente;
  }
}

module.exports = OperacionesSng;