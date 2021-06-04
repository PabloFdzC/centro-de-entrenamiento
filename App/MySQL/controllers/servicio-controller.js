const servicioController = {};
const connection = require("../connection.js")

servicioController.crearServicio = async (req, res) => {
    connection.query('CALL CrearServicio(?,?)',[req.body.nombreServicio, req.body.costoMatricula], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }
  
  servicioController.eliminarServicio = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL EliminarServicio(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = servicioController;