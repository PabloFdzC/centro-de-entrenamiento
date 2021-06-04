const salaController = {};
const connection = require("../connection.js")

salaController.crearSala = async (req, res) => {
    connection.query('CALL CrearSala(?,?)',[req.body.costoMatricula, req.body.aforo], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  salaController.editarSala = async (req, res) => {
    connection.query('CALL editarSala(?,?,?)',[req.body.idSala, req.body.costoMatricula, req.body.aforo], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  salaController.agregarServicioASala = async (req, res) => {
    connection.query('CALL AgregarServicioASala(?,?)',[req.body.IdSala, req.body.nombreServicio], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  salaController.eliminarServicioASala = async (req, res) => {
    connection.query('CALL EliminarServicioDeSala(?,?)',[req.body.IdSala, req.body.nombreServicio], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  module.exports = salaController;