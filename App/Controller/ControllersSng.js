ControllerAdministrador = require('ControllerAdministrador.js');
ControllerPago = require('ControllerPago.js');
ControllerSala = require('ControllerSala.js');
ControllerServicios = require('ControllerServicios.js');
ControllerInstructor = require('ControllerInstructor.js');
ControllerClase = require('ControllerClase.js');
ControllerUsuario = require('ControllerUsuario.js');
ControllerCliente = require('ControllerCliente.js');

class ControllerSng{
  static #instance = null;
  static #controllerAdministrador = null;
  static #controllerPago = null;
  static #controllerSala = null;
  static #controllerServicios = null;
  static #controllerInstructor = null;
  static #controllerClase = null;
  static #controllerUsuario = null;
  static #controllerCliente = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ControllerSng();
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

  static getControllerServicios(){
    if(this.#controllerServicios == null){
      this.#controllerServicios = new ControllerServicios();
    }
    return this.#controllerServicios;
  }

  static getControllerInstructor(){
    if(this.#controllerInstructor == null){
      this.#controllerInstructor = new ControllerInstructor();
    }
    return this.#controllerInstructor;
  }

  static getControllerClase(){
    if(this.#controllerClase == null){
      this.#controllerClase = new ControllerClase();
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

module.exports = ControllerSng;