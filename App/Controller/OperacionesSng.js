OperacionesAdministrador = require('./OperacionesAdministrador.js');
OperacionesClase = require('./OperacionesClase.js');
OperacionesCliente = require('./OperacionesCliente.js');
OperacionesInstructor = require('./OperacionesInstructor.js');
OperacionesJornada = require('./OperacionesJornada.js');
OperacionesNavegacion = require('./OperacionesNavegacion.js');
OperacionesPago = require('./OperacionesPago.js');
OperacionesSala = require('./OperacionesSala.js');
OperacionesServicio = require('./OperacionesServicio.js');
OperacionesUsuario = require('./OperacionesUsuario.js');

class OperacionesSng{
  static #instance = null;
  #operacionesAdministrador = null;
  #operacionesClase = null;
  #operacionesCliente = null;
  #operacionesInstructor = null;
  #operacionesJornada = null;
  #operacionesNavegacion = null;
  #operacionesPago = null;
  #operacionesSala = null;
  #operacionesServicio = null;
  #operacionesUsuario = null;

  constructor(){}
  
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

  getOperacionesClase(){
    if(this.#operacionesClase == null){
      this.#operacionesClase = OperacionesClase;
    }
    return this.#operacionesClase;
  }

  getOperacionesCliente(){
    if(this.#operacionesCliente == null){
      this.#operacionesCliente = OperacionesCliente;
    }
    return this.#operacionesCliente;
  }

  getOperacionesInstructor(){
    if(this.#operacionesInstructor == null){
      this.#operacionesInstructor = OperacionesInstructor;
    }
    return this.#operacionesInstructor;
  }

  getOperacionesJornada(){
    if(this.#operacionesJornada == null){
      this.#operacionesJornada = OperacionesJornada;
    }
    return this.#operacionesJornada;
  }

  getOperacionesNavegacion(){
    if(this.#operacionesNavegacion == null){
      this.#operacionesNavegacion = OperacionesNavegacion;
    }
    return this.#operacionesNavegacion;
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

  getOperacionesServicio(){
    if(this.#operacionesServicio == null){
      this.#operacionesServicio = OperacionesServicio;
    }
    return this.#operacionesServicio;
  }

  getOperacionesUsuario(){
    if(this.#operacionesUsuario == null){
      this.#operacionesUsuario = OperacionesUsuario;
    }
    return this.#operacionesUsuario;
  }

}

module.exports = OperacionesSng;