const instructorController = {};
const connection = require("../connection.js")

instructorController.registroInstructor = async (req, res) => {
    connection.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?)',[req.body.email, req.body.identificacion, req.body.primerNombre, req.body.segundoNombre, req.body.primerApellido, req.body.segundoApellido, req.body.contrasenna, req.body.telefono], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  instructorController.modificarInstructor = async (req, res) => {
    connection.query('CALL modificarInstructor(?,?,?,?,?,?,?)',[req.body.email, req.body.identificacion, req.body.primerNombre, req.body.segundoNombre, req.body.primerApellido, req.body.segundoApellido, req.body.contrasenna, req.body.telefono], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  instructorController.modificarContrasennaInstructor = async (req, res) => {
    connection.query('CALL modificarContrasennaInstructor(?,?)',[req.body.email, req.body.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  instructorController.agregarServicioAInstructor = async (req, res) => {
    connection.query('CALL AgregarServicioAInstructor(?,?)',[req.body.email, req.body.nombreServicio], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  instructorController.eliminarServicioAInstructor = async (req, res) => {
    connection.query('CALL EliminarServicioAInstructor(?,?)',[req.body.email, req.body.nombreServicio], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

module.exports = instructorController;