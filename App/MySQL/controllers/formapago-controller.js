const formaPagoController = {};
const connection = require("../connection.js")

formaPagoController.crearFormaPago = async (req, res) => {
    connection.query('CALL CrearFormaPago(?)',[req.body.nombre], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  formaPagoController.eliminarFormaPago = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL EliminarFormaPago(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = formaPagoController;