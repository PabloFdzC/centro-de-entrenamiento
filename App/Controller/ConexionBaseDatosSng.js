const ConexionBaseDatos = require("./ConexionBaseDatos.js");

class ConexionBaseDatosSng{
  static #instance = null;
  #conexionBaseDatos = null;

  static getInstance(){
    if(this.#instance == null){
      this.#instance = new ConexionBaseDatosSng();
    }
    return this.#instance;
  }

  getConexionBaseDatos(){
    if(this.#conexionBaseDatos == null){
      this.#conexionBaseDatos = new ConexionBaseDatos();
    }
    return this.#conexionBaseDatos;
  }
}

module.exports = ConexionBaseDatosSng;