const administradorController = {};
const connection = require("../connection.js")

administradorController.registroAdministrador = async (req, res) => {
    connection.query('CALL RegistroAdministrador(?,?)',[req.body.email, req.body.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }
  
  administradorController.modificarContrasennaAdministrador = async (req, res) => {
    connection.query('CALL modificarContrasennaAdministrador(?,?)',[req.body.email, req.body.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = administradorController;