const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionAdministrador{
  
  constructor(){}

  async agregar(elem, password){
    return new Promise(function(resolve, reject){
      connection.query('CALL RegistroAdministrador(?,?)',[elem.email, password], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(password);
        }
      });
    });
  }

  async modificarContrasenna(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarContrasennaAdministrador(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionAdministrador;