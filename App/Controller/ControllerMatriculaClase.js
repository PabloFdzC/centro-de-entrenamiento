const TransaccionMatriculaClase = require("./TransaccionMatriculaClase.js");
const Cliente = require("./../Model/Cliente");
const Instructor = require("./../Model/Instructor");

class ControllerMatriculaClase{
  #transaccionMatriculaClase = null;

  constructor(){
    this.#transaccionMatriculaClase = new TransaccionMatriculaClase();
  }

  async agregar(elem){
    let r = await this.#transaccionMatriculaClase.agregar(elem);
    return r;
  }

  async eliminar(elem){
    let r = await this.#transaccionMatriculaClase.eliminar(elem);
    return r;
  }

  async mostrarTodosXIdClase(id){
    var listaclientesresult = await this.#transaccionMatriculaClase.mostrarTodosXIdClase(id);
    var i;
    var listaClientes = [];
    for(i = 0; i < listaclientesresult.length; i++){
      let clienteresult = listaclientesresult[i];
      var cliente = new Instructor(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
      listaClientes.push(cliente);
    }
    return listaClientes;
  }

  async mostrarPersonasMatriculadas(idClase){
    var listaclientesresult = await this.#transaccionMatriculaClase.mostrarPersonasMatriculadas(idClase);
    var i;
    var listaClientes = [];
    for(i = 0; i < listaclientesresult.length; i++){
      let clienteresult = listaclientesresult[i];
      var cliente = new Cliente(
        clienteresult.primer_nombre,
        clienteresult.segundo_nombre,
        clienteresult.primer_apellido,
        clienteresult.segundo_apellido,
        null,
        null,
        clienteresult.email,
        null
        );
      listaClientes.push(cliente);
    }
    return listaClientes;
  }
}

module.exports = ControllerMatriculaClase;