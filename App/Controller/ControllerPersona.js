const connection = require("connection.js");
class ControllerPersona{
  
  constructor(){}

  iniciarSesion(req, res){
    connection.query('CALL LogIn(?,?)',[req.body.email, req.body.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        clienteresult = result[0][0];
        cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        console.log({clienteresult});
        console.log( "exito: ", result);
        res.session.user = cliente;
        res.send(result);
      }
    });
  }

  modificarContrasenna(elem, res){
    connection.query('CALL modificarContrasenna(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

}

module.exports = ControllerPersona;