const connection = require("./connection.js");
class ControllerAdministrador{
  
  constructor(){}

  agregar(elem){
    var res;
    
    connection.query('CALL RegistroAdministrador(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res = error.message;
      }else{
        console.log( "exito: ", result);
        res = result;
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