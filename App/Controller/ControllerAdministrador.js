const connection = require("connection.js");
class ControllerAdministrador{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL RegistroAdministrador(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  consultar(elem){

  }

  eliminar(elem){
    
  }

}

module.exports = ControllerAdministrador;