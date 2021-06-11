const connection = require("./ConexionBaseDatos.js");
class ControllerAdministrador{
  
  constructor(){}

  async agregar(elem){
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 10; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
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

  consultar(elem){

  }

  eliminar(elem){
    
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

module.exports = ControllerAdministrador;