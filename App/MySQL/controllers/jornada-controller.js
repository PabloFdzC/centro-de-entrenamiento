const jornadaController = {};
const connection = require("../connection.js")

jornadaController.crearJornada = async (req, res) => {
    connection.query('CALL CrearJornada(?,?,?)',[req.body.dia, req.body.idIntervalo, req.body.idSala], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }
  
  jornadaController.editarJornada = async (req, res) => {
    connection.query('CALL EditarJornada(?,?,?,?)',[req.body.idJornada, req.body.dia, req.body.idIntervalo, req.body.idSala], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  jornadaController.eliminarJornada = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL EliminarJornada(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = jornadaController;