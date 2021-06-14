const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionUsuario{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearServicio(?,?)',[elem.nombre, elem.costo], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async iniciarSesion(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL LogIn(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionUsuario;