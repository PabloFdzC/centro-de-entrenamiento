const TransaccionAdministrador = require('./TransaccionAdministrador.js');
const Administrador = require('./../Model/Administrador.js');

class ControllerAdministrador{

  #transaccionAdministrador = null;
  #administradores = null;
  
  constructor(){
    this.#transaccionAdministrador = new TransaccionAdministrador();
    this.#administradores = {};
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
    this.agregaMemoria(elem);
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

  agregaMemoria(elem = {email:null,clasesEnEspera:null}){
    if(!(elem.email in this.#administradores)){
      this.#administradores[elem.email] = new Administrador(
        elem.email
        );
    } else {
      let a = this.#administradores[elem.email];
      if(elem.clasesEnEspera != null){
        a.setClasesEnEspera(elem.clasesEnEspera);
      }
    }
    return this.#administradores[elem.email];
  }

}

module.exports = ControllerAdministrador;