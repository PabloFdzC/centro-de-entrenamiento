ControllerAdministrador = require('./ControllerAdministrador.js');
ControllerPago = require('./ControllerPago.js');
ControllerSala = require('./ControllerSala.js');
ControllerServicio = require('./ControllerServicio.js');
ControllerInstructor = require('./ControllerInstructor.js');
ControllerClase = require('./ControllerClase.js');
ControllerUsuario = require('./ControllerUsuario.js');
ControllerCliente = require('./ControllerCliente.js');

class ControllersSng{
  static #instance = null;
  static #controllerAdministrador = null;
  static #controllerPago = null;
  static #controllerSala = null;
  static #controllerServicio = null;
  static #controllerInstructor = null;
  static #controllerClase = null;
  static #controllerUsuario = null;
  static #controllerCliente = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ControllersSng();
    }
    return this.#instance;
  }

  static getControllerAdministrador(){
    if(this.#controllerAdministrador == null){
      this.#controllerAdministrador = new ControllerAdministrador();
    }
    return this.#controllerAdministrador;
  }

  static getControllerPago(){
    if(this.#controllerPago == null){
      this.#controllerPago = new ControllerPago();
    }
    return this.#controllerPago;
  }

  static getControllerSala(){
    if(this.#controllerSala == null){
      this.#controllerSala = new ControllerSala();
    }
    return this.#controllerSala;
  }

  static getControllerServicio(){
    if(this.#controllerServicio == null){
      this.#controllerServicio = new ControllerServicio();
    }
    return this.#controllerServicio;
  }

  static getControllerInstructor(){
    if(this.#controllerInstructor == null){
      this.#controllerInstructor = new ControllerInstructor();
    }
    return this.#controllerInstructor;
  }

  static getControllerClase(){
    if(this.#controllerClase == null){
      this.#controllerClase = new ControllerClase(this.getControllerInstructor());
    }
    return this.#controllerClase;
  }

  static getControllerUsuario(){
    if(this.#controllerUsuario == null){
      this.#controllerUsuario = new ControllerUsuario();
    }
    return this.#controllerUsuario;
  }

  static getControllerCliente(){
    if(this.#controllerCliente == null){
      this.#controllerCliente = new ControllerCliente();
    }
    return this.#controllerCliente;
  }
}

module.exports = ControllersSng;