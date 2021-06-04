const claseController = {};
const connection = require("../connection.js")

claseController.crearClase = async (req, res) => {
    connection.query('CALL CrearClase(?,?,?,?)',[req.body.capacidad, req.body.nombreServicio, req.body.idJornada, req.body.idIntervalo], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.publicarClase = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL PublicarClase(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.deshabilitarClase = async (req, res) => {
    const { id } = req.params;
    connection.query('CALL DeshabilitarClase(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.matricularClase = async (req, res) => {
    connection.query('CALL MatricularClase(?,?)',[req.body.idClase, req.body.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  claseController.cancelarMatricula = async (req, res) => {
    connection.query('CALL CancelarMatricula(?,?)',[req.body.idClase, req.body.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

module.exports = claseController;