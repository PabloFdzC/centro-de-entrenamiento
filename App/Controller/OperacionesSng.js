OperacionesAdministrador = require('OperacionesAdministrador.js');
OperacionesPago = require('OperacionesPago.js');
OperacionesSala = require('OperacionesSala.js');
OperacionesServicios = require('OperacionesServicios.js');
OperacionesInstructor = require('OperacionesInstructor.js');
OperacionesClase = require('OperacionesClase.js');
OperacionesUsuario = require('OperacionesUsuario.js');
OperacionesCliente = require('OperacionesCliente.js');

class OperacionesSng{
  static #instance = null;
  static #operacionesAdministrador = null;
  static #operacionesPago = null;
  static #operacionesSala = null;
  static #operacionesServicios = null;
  static #operacionesInstructor = null;
  static #operacionesClase = null;
  static #operacionesUsuario = null;
  static #operacionesCliente = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new OperacionesSng();
    }
    return this.#instance;
  }

  static operacionesAdministrador(){
    if(this.#operacionesAdministrador == null){
      this.#operacionesAdministrador = OperacionesAdministrador;
    }
    return this.#operacionesAdministrador;
  }

  static operacionesPago(){
    if(this.#operacionesPago == null){
      this.#operacionesPago = OperacionesPago;
    }
    return this.#operacionesPago;
  }

  static operacionesSala(){
    if(this.#operacionesSala == null){
      this.#operacionesSala = OperacionesSala;
    }
    return this.#operacionesSala;
  }

  static operacionesServicios(){
    if(this.#operacionesServicios == null){
      this.#operacionesServicios = OperacionesServicios;
    }
    return this.#operacionesServicios;
  }

  static operacionesInstructor(){
    if(this.#operacionesInstructor == null){
      this.#operacionesInstructor = OperacionesInstructor;
    }
    return this.#operacionesInstructor;
  }

  static operacionesClase(){
    if(this.#operacionesClase == null){
      this.#operacionesClase = OperacionesClase;
    }
    return this.#operacionesClase;
  }

  static operacionesUsuario(){
    if(this.#operacionesUsuario == null){
      this.#operacionesUsuario = OperacionesUsuario;
    }
    return this.#operacionesUsuario;
  }

  static operacionesCliente(){
    if(this.#operacionesCliente == null){
      this.#operacionesCliente = OperacionesCliente;
    }
    return this.#operacionesCliente;
  }
}

module.exports = OperacionesSng;