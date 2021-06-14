const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionCliente = ConexionSng.getConexionCliente();
Cliente = require("./../Model/Cliente.js");

class ControllerCliente{
  
  constructor(){}

  async agregar(elem){
    try{
      var result = await ConexionCliente.agregar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  consultar(email){
      try{
        var result = await ConexionCliente.consultar(email);
        var clienteresult = result[0][0];
        var cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido,
          clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        return cliente;
      }catch(err){
        throw err;
      }
  }

  async modificar(elem){
    try{
      var result = await ConexionCliente.modificar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  mostrarClientes(){
    try{
      var result = await ConexionCliente.mostrarClientes();
      var listaclientesresult = result[0];
      var i;
      var listaClientes = [];
      for(i = 0; i < listaclientesresult.length; i++){
        var clienteresult = listaclientesresult[i];
        var cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido,
          clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        listaClientes.push(cliente);
      }
      return listaClientes;
    }catch(err){
      throw err;
    }
  }

  async modificarContrasenna(elem){
    try{
      var result = await ConexionCliente.modificarContrasenna(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerCliente;