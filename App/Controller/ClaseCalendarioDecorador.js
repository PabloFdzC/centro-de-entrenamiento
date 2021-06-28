const AccionClase = require("../Model/AccionClase");

class ClaseCalendarioDecorador{
  #claseCalendario = null;

  constructor(claseCalendario){
    this.#claseCalendario = claseCalendario;
  }

  getClaseCalendario(){
    return this.#claseCalendario;
  }

  accionDeClase(){
    return AccionClase.VER;
  }

}

module.exports = ClaseCalendarioDecorador;