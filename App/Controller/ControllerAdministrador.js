const TransaccionAdministrador = require('./TransaccionAdministrador.js');

class ControllerAdministrador{

  #transaccionAdministrador = null;
  
  constructor(){
    this.#transaccionAdministrador = new TransaccionAdministrador();
  }

  async agregar(elem){
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 10; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    elem.password = password;
    await this.#transaccionAdministrador.agregar(elem);
    return password;
  }

  async modificarContrasenna(elem){
    var result = await this.#transaccionAdministrador.modificarContrasenna(elem);
    return result;
  }

  async contar(){
    var r = await this.#transaccionAdministrador.contar();
    return r;
  }

}

module.exports = ControllerAdministrador;