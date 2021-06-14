const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionUsuario = ConexionSng.getConexionUsuario();
class ControllerPersona{
  
  constructor(){}

  async iniciarSesion(elem){
    try{
      var result = await ConexionUsuario.iniciarSesion(elem);
      var usuarioresult = result[0][0];
      if(usuarioresult.email && usuarioresult.tipo_usuario){
        var usuario = {email: usuarioresult.email, tipo_usuario: usuarioresult.tipo_usuario};
        return usuario;
      }
      else{
        throw {code: "Email o contraseña incorrecta"}
      }
    }catch(err){
      throw err;
    }
  }
  
}

module.exports = ControllerPersona;