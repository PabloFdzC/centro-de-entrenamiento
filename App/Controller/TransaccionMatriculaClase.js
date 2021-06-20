const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionMatriculaClase{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL MatricularClase(?,?)',
      [elem.idClase, elem.email]
      );
    return r;
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL CancelarMatricula(?,?)',
      [elem.idClase, elem.email]
      );
    return r[0];
  }

  async mostrarPersonasMatriculadas(idClase){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetMatriculasClase(?)',
      [idClase]
      );
    return r[0];
  }

  async mostrarTodosXIdClase(idClase){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetHorarioClase(?)',
      [idClase]);
      return r[0];
  }

}

module.exports = TransaccionMatriculaClase;