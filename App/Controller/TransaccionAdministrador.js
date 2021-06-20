const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionAdministrador{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL RegistroAdministrador(?,?)',
      [elem.email, elem.password]
      );
  }

  async modificarContrasenna(elem){
    return await this.#conexionBaseDatos.query(
      'CALL modificarContrasennaAdministrador(?,?)',
      [elem.email, elem.contrasenna]
      );
  }

  async contar(){
    var r = await this.#conexionBaseDatos.query(
      'CALL ContarAdministradores()',[]
      );
    return r[0][0].total;
  }

}

module.exports = TransaccionAdministrador;