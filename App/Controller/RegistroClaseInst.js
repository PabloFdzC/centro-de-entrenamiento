const EstadoClase = require("../Model/EstadoClase");

class RegistroClaseInst{
  #email;

  setEmailInstructor(email){
    this.#email = email;
  }

  agregar(elem){
    elem.estado = EstadoClase.AGENDADA;
    elem.instructor = this.#email;
    return elem;
  }
}

module.exports = RegistroClaseInst;