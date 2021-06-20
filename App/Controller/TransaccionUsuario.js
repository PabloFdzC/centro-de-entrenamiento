const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionUsuario{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async iniciarSesion(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL LogIn(?,?)',
      [elem.email, elem.contrasenna]
      );
    return r[0][0];
  }

}

module.exports = TransaccionUsuario;