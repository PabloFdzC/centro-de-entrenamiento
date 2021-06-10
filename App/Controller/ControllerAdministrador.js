const connection = require("./connection.js");
class ControllerAdministrador{
  
  constructor(){}

  agregar(elem){
    var res;
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    connection.query('CALL RegistroAdministrador(?,?)',[elem.email, password], function(error, result){
      if(error){
        console.log("error: ", error);
        res = error.message;
      }else{
        console.log( "exito: ", result);
        res = {password};
      }
    });

    return res;
  }

  consultar(elem){

  }

  eliminar(elem){
    
  }

  modificarContrasenna(elem){
    var res;
    connection.query('CALL modificarContrasennaAdministrador(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

}

module.exports = ControllerAdministrador;