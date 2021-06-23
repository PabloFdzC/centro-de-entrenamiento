const TransaccionMatriculaClase = require("./TransaccionMatriculaClase.js");

class ControllerMatriculaClase{
  #transaccionMatriculaClase = null;
  #ctrlCliente= null;

  constructor(ctrlCliente){
    this.#transaccionMatriculaClase = new TransaccionMatriculaClase();
    this.#ctrlCliente = ctrlCliente;
  }

  async agregar(elem){
    let r = await this.#transaccionMatriculaClase.agregar(elem);
    return r;
  }

  async eliminar(elem){
    let r = await this.#transaccionMatriculaClase.eliminar(elem);
    return r;
  }

  async mostrarPersonasMatriculadas(id){
    var listaclientesresult = await this.#transaccionMatriculaClase.mostrarPersonasMatriculadas(id);
    var i;
    var listaClientes = [];
    for(i = 0; i < listaclientesresult.length; i++){
      let c = listaclientesresult[i];
      var cliente = this.#ctrlCliente.agregaMemoria({
        primerNombre:c.primer_nombre,
        segundoNombre:c.segundo_nombre,
        primerApellido:c.primer_apellido,
        segundoApellido:c.segundo_apellido,
        email:c.email,
      });
      listaClientes.push(cliente);
    }
    return listaClientes;
  }
}

module.exports = ControllerMatriculaClase;