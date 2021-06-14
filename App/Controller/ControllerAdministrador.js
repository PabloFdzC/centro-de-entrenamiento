const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionAdministrador = ConexionSng.getConexionAdministrador();
class ControllerAdministrador{
  
  constructor(){}

  async agregar(elem){
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 10; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    try{
      var result = await ConexionAdministrador.agregar(elem, password);
      return password;
    }catch(err){
      throw err;
    }
  }

  async modificarContrasenna(elem){
    try{
      var result = await ConexionAdministrador.modificarContrasenna(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerAdministrador;