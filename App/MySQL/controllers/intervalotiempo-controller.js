const intervaloTiempoController = {};
const connection = require("../connection.js")

intervaloTiempoController.crearIntervaloTiempo = async (req, res) => {
    connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[req.body.horaInicio, req.body.horaFinal, req.body.minutoInicio, req.body.minutoFinal], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }
  
  intervaloTiempoController.eliminarIntervaloTiempo = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL EliminarIntervaloTiempo(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = intervaloTiempoController;