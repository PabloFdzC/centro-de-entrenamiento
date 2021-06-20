const ControllerAdministrador = require('./ControllerAdministrador.js');
const ControllerClase = require('./ControllerClase.js');
const ControllerCliente = require('./ControllerCliente.js');
const ControllerInstructor = require('./ControllerInstructor.js');
const ControllerJornada = require('./ControllerJornada.js');
const ControllerIntervaloTiempo = require('./ControllerIntervaloTiempo.js');
const ControllerMatriculaClase = require('./ControllerMatriculaClase.js');
const ControllerPago = require('./ControllerPago.js');
const ControllerSala = require('./ControllerSala.js');
const ControllerServicio = require('./ControllerServicio.js');
const ControllerServicioInstructor = require('./ControllerServicioInstructor.js');
const ControllerServicioSala = require('./ControllerServicioSala.js');
const ControllerUsuario = require('./ControllerUsuario.js');

class ControllersSng{
  static #instance = null;
  #controllerAdministrador = null;
  #controllerClase = null;
  #controllerCliente = null;
  #controllerInstructor = null;
  #controllerJornada = null;
  #controllerIntervaloTiempo = null;
  #controllerMatriculaClase = null;
  #controllerPago = null;
  #controllerSala = null;
  #controllerServicio = null;
  #controllerServicioInstructor = null;
  #controllerServicioSala = null;
  #controllerUsuario = null;

  constructor(){}
  
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ControllersSng();
    }
    return this.#instance;
  }

  getControllerAdministrador(){
    if(this.#controllerAdministrador == null){
      this.#controllerAdministrador = new ControllerAdministrador();
    }
    return this.#controllerAdministrador;
  }

  getControllerClase(){
    if(this.#controllerClase == null){
      this.#controllerClase = new ControllerClase(
        this.getControllerInstructor(),
        this.getControllerIntervaloTiempo(),
        this.getControllerJornada(),
        this.getControllerMatriculaClase()
      );
    }
    return this.#controllerClase;
  }

  getControllerCliente(){
    if(this.#controllerCliente == null){
      this.#controllerCliente = new ControllerCliente();
    }
    return this.#controllerCliente;
  }

  getControllerInstructor(){
    if(this.#controllerInstructor == null){
      this.#controllerInstructor = new ControllerInstructor(this.getControllerServicioInstructor());
    }
    return this.#controllerInstructor;
  }

  getControllerJornada(){
    if(this.#controllerJornada == null){
      this.#controllerJornada = new ControllerJornada(
        this.getControllerInstructor(),
        this.getControllerMatriculaClase(),
        this.getControllerIntervaloTiempo()
        );
    }
    return this.#controllerJornada;
  }

  getControllerIntervaloTiempo(){
    if(this.#controllerIntervaloTiempo == null){
      this.#controllerIntervaloTiempo = new ControllerIntervaloTiempo();
    }
    return this.#controllerIntervaloTiempo;
  }

  getControllerMatriculaClase(){
    if(this.#controllerMatriculaClase == null){
      this.#controllerMatriculaClase = new ControllerMatriculaClase();
    }
    return this.#controllerMatriculaClase;
  }

  getControllerPago(){
    if(this.#controllerPago == null){
      this.#controllerPago = new ControllerPago();
    }
    return this.#controllerPago;
  }

  getControllerSala(){
    if(this.#controllerSala == null){
      this.#controllerSala = new ControllerSala(
        this.getControllerServicioSala(),
        this.getControllerJornada()
        );
    }
    return this.#controllerSala;
  }

  getControllerServicio(){
    if(this.#controllerServicio == null){
      this.#controllerServicio = new ControllerServicio();
    }
    return this.#controllerServicio;
  }

  getControllerServicioInstructor(){
    if(this.#controllerServicioInstructor == null){
      this.#controllerServicioInstructor = new ControllerServicioInstructor();
    }
    return this.#controllerServicioInstructor;
  }

  getControllerServicioSala(){
    if(this.#controllerServicioSala == null){
      this.#controllerServicioSala = new ControllerServicioSala();
    }
    return this.#controllerServicioSala;
  }

  getControllerUsuario(){
    if(this.#controllerUsuario == null){
      this.#controllerUsuario = new ControllerUsuario();
    }
    return this.#controllerUsuario;
  }

}

module.exports = ControllersSng;