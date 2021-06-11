const connection = require("./ConexionBaseDatos.js");
class ControllerPersona{
  
  constructor(){}

  async iniciarSesion(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL LogIn(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          var usuarioresult = result[0][0];
          var usuario = {email: usuarioresult.email, tipo_usuario: usuarioresult.tipo_usuario};
          resolve(usuario);
        }
      });
    });
  }
  
}

module.exports = ControllerPersona;