const connection = require("./ConexionBaseDatos.js");
class ControllerPersona{
  
  constructor(){}

  iniciarSesion(elem){
    var res;
    connection.query('CALL LogIn(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        usuarioresult = result[0][0];
        usuario = {email = usuarioresult.email, tipo_usuario = usuarioresult.tipo_usuario};
        console.log( "exito: ", result);
        res = usuario;
      }
    });
    return res;
  }
  
}

module.exports = ControllerPersona;