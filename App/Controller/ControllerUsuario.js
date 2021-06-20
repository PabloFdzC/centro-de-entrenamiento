const TransaccionUsuario = require("./TransaccionUsuario.js");
class ControllerUsuario{
  #transaccionUsuario = null;
  
  constructor(){
    this.#transaccionUsuario = new TransaccionUsuario();
  }

  async iniciarSesion(elem){
    var usuarioresult = await this.#transaccionUsuario.iniciarSesion(elem);
    if(usuarioresult.email && usuarioresult.tipo_usuario){
      var usuario = {email: usuarioresult.email, tipo_usuario: usuarioresult.tipo_usuario};
      return usuario;
    } else {
      throw {code: "ER_LOGIN"};
    }
  }
  
}

module.exports = ControllerUsuario;