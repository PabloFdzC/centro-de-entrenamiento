const clienteController = {};
const connection = require("../connection.js")

clienteController.registroCliente = async (req, res) => {
    connection.query('CALL RegistroCliente(?,?,?,?,?,?,?,?)',[req.body.email, req.body.identificacion, req.body.primerNombre, req.body.segundoNombre, req.body.primerApellido, req.body.segundoApellido, req.body.contrasenna, req.body.telefono], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  clienteController.modificarCliente = async (req, res) => {
    connection.query('CALL modificarCliente(?,?,?,?,?,?,?)',[req.body.email, req.body.identificacion, req.body.primerNombre, req.body.segundoNombre, req.body.primerApellido, req.body.segundoApellido, req.body.contrasenna, req.body.telefono], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  clienteController.modificarContrasennaCliente = async (req, res) => {
    connection.query('CALL modificarContrasennaCliente(?,?)',[req.body.email, req.body.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

module.exports = clienteController;