const estadoPagoController = {};
const connection = require("../connection.js")

estadoPagoController.crearEstadoPago = async (req, res) => {
    connection.query('CALL CrearEstadoPago(?)',[req.body.nombre], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  estadoPagoController.eliminarEstadoPago = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL EliminarEstadoPago(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = estadoPagoController;