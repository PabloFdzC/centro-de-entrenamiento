const pagoController = {};
const connection = require("../connection.js")

instructorController.crearPago = async (req, res) => {
    connection.query('CALL CrearPago(?,?)',[req.body.cantidad, req.body.emailCliente], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.pagoMoroso = async (req, res) => {
    const { idPago } = req.params;
    connection.query('CALL pagoMoroso(?)',[idPago], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.realizarPago = async (req, res) => {
    const { idPago } = req.params;
    connection.query('CALL RealizarPago(?)',[idPago], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

module.exports = pagoController;