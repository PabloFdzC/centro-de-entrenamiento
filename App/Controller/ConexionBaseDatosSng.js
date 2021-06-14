const ConexionBaseDatos = require("./ConexionBaseDatos.js");

class ConexionBaseDatosSng{
  static #instance = null;
  static #conexionBaseDatos = null;

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
}

module.exports = ConexionBaseDatosSng;