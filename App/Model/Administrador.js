class Administrador{
  #email = null;
  #clasesEnEspera = null;
  
  constructor(email,clasesEnEspera){
    this.#email = email;
    this.#clasesEnEspera = clasesEnEspera;
  }

  getEmail(){
    return this.#email;
  }

  setEmail(email){
    this.#email = email;
  }

  getClasesEnEspera(){
    return this.#clasesEnEspera;
  }

  setClasesEnEspera(clasesEnEspera){
    this.#clasesEnEspera = clasesEnEspera;
  }

  actualizar(){

  }
}

module.exports = Administrador;