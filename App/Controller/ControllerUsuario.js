const connection = require("./ConexionBaseDatos.js");
class ControllerPersona{
  
  constructor(){}

  iniciarSesion(elem){
    var res;
    connection.query('CALL LogIn(?,?)',[elem.email, elem.contrasenna], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        clienteresult = result[0][0];
        cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        console.log({clienteresult});
        console.log( "exito: ", result);
        res = cliente.getEmail();
      }
    });
    return res;
  }
  
}

module.exports = ControllerPersona;