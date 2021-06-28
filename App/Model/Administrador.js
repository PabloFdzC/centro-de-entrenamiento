class Administrador{
  #email = null;
  #clasesEnEspera = [];
  
  constructor(email,clasesEnEspera=[]){
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

  actualizar(clase, elimina){
    if(elimina){
      let i = this.#clasesEnEspera.indexOf(clase);
      if (i > -1) {
        this.#clasesEnEspera.splice(i, 1);
      }
    } else {
      if(!this.#clasesEnEspera.includes(clase)){
        this.#clasesEnEspera.push(clase);
      }
    }
  }
}

module.exports = Administrador;