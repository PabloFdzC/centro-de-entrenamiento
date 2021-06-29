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
      [elem.idClaseJornada, elem.email]
      );
    return r;
  }

  async eliminar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL CancelarMatricula(?,?)',
      [elem.idClaseJornada, elem.email]
      );
    return r[0];
  }

  async mostrarPersonasMatriculadas(idClaseJornada){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetMatriculasClase(?)',
      [idClaseJornada]
      );
    return r[0];
  }

}

module.exports = TransaccionMatriculaClase;