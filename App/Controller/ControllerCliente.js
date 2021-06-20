const TransaccionCliente = require("./TransaccionCliente.js");
const Cliente = require("./../Model/Cliente.js");
const ArreglaFechas = require("./ArreglaFechas.js");

class ControllerCliente{
  #transaccionCliente = null;
  
  constructor(){
    this.#transaccionCliente = new TransaccionCliente();
  }

  async agregar(elem){
    var result = await this.#transaccionCliente.agregar(elem);
    return result;
  }

  async consultar(email){
    var result = await this.#transaccionCliente.consultar(email);
    var clienteresult = result[0][0];
    var cliente = new Cliente(clienteresult.primer_nombre,
      clienteresult.segundo_nombre,
      clienteresult.primer_apellido,
      clienteresult.segundo_apellido,
      ArreglaFechas.baseParaFecha(clienteresult.fecha_nacimiento),
      clienteresult.telefono,
      clienteresult.email,
      clienteresult.identificacion
      );
    return cliente;
  }

  async modificar(elem){
    var result = await this.#transaccionCliente.modificar(elem);
    return result;
  }

  async mostrarTodos(){
    var result = await this.#transaccionCliente.mostrarTodos();
    var listaclientesresult = result[0];
    var i;
    var listaClientes = [];
    for(i = 0; i < listaclientesresult.length; i++){
      var clienteresult = listaclientesresult[i];
      var cliente = new Cliente(clienteresult.primer_nombre,
        clienteresult.segundo_nombre,
        clienteresult.primer_apellido,
        clienteresult.segundo_apellido,
        ArreglaFechas.baseParaFecha(clienteresult.fecha_nacimiento),
        clienteresult.telefono,
        clienteresult.email,
        clienteresult.identificacion
        );
      listaClientes.push(cliente);
    }
    return listaClientes;
  }

  async modificarContrasenna(elem){
    var result = await this.#transaccionCliente.modificarContrasenna(elem);
    return result;
  }

}

module.exports = ControllerCliente;