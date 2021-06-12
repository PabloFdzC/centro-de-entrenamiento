const connection = require("./ConexionBaseDatos.js");
Cliente = require("./../Model/Cliente.js");

class ControllerCliente{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL RegistroCliente(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  consultar(elem){

  }

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarCliente(?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  mostrarClientes(){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClientes()',[], async function(error, result){
        if(error){
          reject(error);
        }else{
          var listaclientesresult = result[0];
          var i;
          var listaClientes = [];
          for(i = 0; i < listaclientesresult.length; i++){
            var clienteresult = listaclientesresult[i];
            var cliente = new Cliente(clienteresult.primerNombre, clienteresult.segundoNombre, clienteresult.primerApellido, clienteresult.segundoApellido,
              clienteresult.fechaNacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
            listaClientes.push(cliente);
          }
          resolve(listaClientes);
        }
      });
    });
  }

  mostrarClientesEnClase(elem){

  }

  async modificarContrasenna(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarContrasennaCliente(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ControllerCliente;