const TransaccionUsuario = require("./TransaccionUsuario.js");
class ControllerUsuario{
  #transaccionUsuario = null;
  #ctrlAdministrador = null;
  #ctrlCliente = null;
  #ctrlInstructor = null;
  
  constructor(ctrlAdministrador, ctrlCliente, ctrlInstructor){
    this.#transaccionUsuario = new TransaccionUsuario();
    this.#ctrlAdministrador = ctrlAdministrador;
    this.#ctrlCliente = ctrlCliente;
    this.#ctrlInstructor = ctrlInstructor;
  }

  async iniciarSesion(elem){
    var usuarioresult = await this.#transaccionUsuario.iniciarSesion(elem);
    if(usuarioresult.email && usuarioresult.tipo_usuario){
      var usuario = {email: usuarioresult.email, tipo_usuario: usuarioresult.tipo_usuario};
      if(usuario.tipo_usuario === "Administrador"){
        this.#ctrlAdministrador.agregaMemoria(usuario);
      } else if(usuario.tipo_usuario === "Cliente"){
        this.#ctrlCliente.agregaMemoria(usuario);
      } else if(usuario.tipo_usuario === "Instructor"){
        this.#ctrlInstructor.agregaMemoria(usuario);
      }
      return usuario;
    } else {
      throw {code: "ER_LOGIN"};
    }
  }
  
}

module.exports = ControllerUsuario;