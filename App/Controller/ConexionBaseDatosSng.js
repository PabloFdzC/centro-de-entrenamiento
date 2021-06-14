const ConexionAdministrador = require("./ConexionAdministrador.js");
const ConexionBaseDatos = require("./ConexionBaseDatos.js");
const ConexionClase = require("./ConexionClase.js");
const ConexionCliente = require("./ConexionCliente.js");
const ConexionInstructor = require("./ConexionInstructor.js");
const ConexionPago = require("./ConexionPago.js");
const ConexionSala = require("./ConexionSala.js");
const ConexionServicios = require("./ConexionServicios.js");
const ConexionUsuario = require("./ConexionUsuario.js");

class ConexionBaseDatosSng{
  static #instance = null;
  static #conexionBaseDatos = null;
  static #conexionAdministrador = null;
  static #conexionClase = null;
  static #conexionCliente = null;
  static #conexionInstructor = null;
  static #conexionPago = null;
  static #conexionSala = null;
  static #conexionServicios = null;
  static #conexionUsuario = null;

  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ControllersSng();
    }
    return this.#instance;
  }

  static getConexionBaseDatos(){
    if(this.#conexionBaseDatos == null){
      this.#conexionBaseDatos = new ConexionBaseDatos();
    }
    return this.#conexionBaseDatos;
  }

  static getConexionAdministrador(){
    if(this.#conexionAdministrador == null){
      this.#conexionAdministrador = new ConexionAdministrador();
    }
    return this.#conexionAdministrador;
  }

  static getConexionClase(){
    if(this.#conexionClase == null){
      this.#conexionClase = new ConexionClase();
    }
    return this.#conexionClase;
  }

  static getConexionCliente(){
    if(this.#conexionCliente == null){
      this.#conexionCliente = new ConexionCliente();
    }
    return this.#conexionCliente;
  }

  static getConexionInstructor(){
    if(this.#conexionInstructor == null){
      this.#conexionInstructor = new ConexionInstructor();
    }
    return this.#conexionInstructor;
  }

  static getConexionPago(){
    if(this.#conexionPago == null){
      this.#conexionPago = new ConexionPago();
    }
    return this.#conexionPago;
  }

  static getConexionSala(){
    if(this.#conexionSala == null){
      this.#conexionSala = new ConexionSala();
    }
    return this.#conexionSala;
  }

  static getConexionServicios(){
    if(this.#conexionServicios == null){
      this.#conexionServicios = new ConexionServicios();
    }
    return this.#conexionServicios;
  }

  static getConexionUsuario(){
    if(this.#conexionUsuario == null){
      this.#conexionUsuario = new ConexionUsuario();
    }
    return this.#conexionUsuario;
  }

}

module.exports = ConexionBaseDatosSng;