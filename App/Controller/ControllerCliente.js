const TransaccionCliente = require("./TransaccionCliente.js");
const Cliente = require("./../Model/Cliente.js");
const ArreglaFechas = require("./ArreglaFechas.js");

class ControllerCliente{
  #transaccionCliente = null;
  #clientes = null;
  
  constructor(){
    this.#transaccionCliente = new TransaccionCliente();
    this.#clientes = {};
  }

  async agregar(elem){
    var r = await this.#transaccionCliente.agregar(elem);
    this.agregaMemoria(elem);
    return r;
  }

  async consultar(email){
    var result = await this.#transaccionCliente.consultar(email);
    var clienteresult = result[0][0];
    var cliente = this.agregaMemoria({
      primerNombre:clienteresult.primer_nombre,
      segundoNombre:clienteresult.segundo_nombre,
      primerApellido:clienteresult.primer_apellido,
      segundoApellido:clienteresult.segundo_apellido,
      fechaNacimiento:clienteresult.fecha_nacimiento,
      telefono:clienteresult.telefono,
      email:clienteresult.email,
      identificacion:clienteresult.identificacion
    });
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
      var cliente = this.agregaMemoria({
      primerNombre:clienteresult.primer_nombre,
      segundoNombre:clienteresult.segundo_nombre,
      primerApellido:clienteresult.primer_apellido,
      segundoApellido:clienteresult.segundo_apellido,
      fechaNacimiento:clienteresult.fecha_nacimiento,
      telefono:clienteresult.telefono,
      email:clienteresult.email,
      identificacion:clienteresult.identificacion
    });
      listaClientes.push(cliente);
    }
    return listaClientes;
  }

  async modificarContrasenna(elem){
    var result = await this.#transaccionCliente.modificarContrasenna(elem);
    return result;
  }

  agregaMemoria(elem = {primerNombre:null,segundoNombre:null,primerApellido:null,segundoApellido:null,fechaNacimiento:null,telefono:null,email:null,identificacion:null,estadoPago:null}){
    if(!(elem.email in this.#clientes)){
      this.#clientes[elem.email] = new Cliente(elem.primerNombre,
        elem.segundoNombre,
        elem.primerApellido,
        elem.segundoApellido,
        ArreglaFechas.stringAFecha(elem.fechaNacimiento),
        elem.telefono,
        elem.email,
        elem.identificacion,
        elem.estadoPago);
    } else {
      let c = this.#clientes[elem.email];
      if(elem.primerNombre != null && c.getPrimerNombre() != elem.primerNombre){
        c.setPrimerNombre(elem.primerNombre);
      }
      if(elem.segundoNombre != null && c.getSegundoNombre() != elem.segundoNombre){
        c.setSegundoNombre(elem.segundoNombre);
      }
      if(elem.primerApellido != null && c.getPrimerApellido() != elem.primerApellido){
        c.setPrimerApellido(elem.primerApellido);
      }
      if(elem.segundoApellido != null && c.getSegundoApellido() != elem.segundoApellido){
        c.setSegundoApellido(elem.segundoApellido);
      }
      if(elem.fechaNacimiento != null && ArreglaFechas.fechaAString(c.getFechaNacimiento()) != elem.fechaNacimiento){
        c.setFechaNacimiento(ArreglaFechas.stringAFecha(elem.fechaNacimiento));
      }
      if(elem.telefono != null && c.getTelefono() != elem.telefono){
        c.setTelefono(elem.telefono);
      }
      if(elem.identificacion != null && c.getIdentificacion() != elem.identificacion){
        c.setIdentificacion(elem.identificacion);
      }
    }
    return this.#clientes[elem.email];
  }

}

module.exports = ControllerCliente;