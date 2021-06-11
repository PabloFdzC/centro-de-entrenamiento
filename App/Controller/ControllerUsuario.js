const connection = require("./ConexionBaseDatos.js");
class ControllerPersona{
  
  constructor(){}

  async iniciarSesion(elem){
    var res;
    return new Promise(function(resolve, reject){
      connection.query('CALL LogIn(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          usuarioresult = result[0][0];
          usuario = {email: usuarioresult.email, tipo_usuario: usuarioresult.tipo_usuario};
          resolve(usuario);
        }
      });
    });
    
    return res;
  }
  
}

module.exports = ControllerPersona;