const AccionClase = require('../Model/AccionClase.js');

ClaseCalendarioDecorador = require('./ClaseCalendarioDecorador.js');

class ClaseMatricula extends ClaseCalendarioDecorador{

  constructor(claseCalendario){
    super(claseCalendario);
  }

  accionDeClase(){
    return AccionClase.MATRICULAR;
  }
}

module.exports = ClaseMatricula;