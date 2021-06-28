const AccionClase = require('../Model/AccionClase.js');

ClaseCalendarioDecorador = require('./ClaseCalendarioDecorador.js');

class ClaseEditable extends ClaseCalendarioDecorador{

  constructor(claseCalendario){
    super(claseCalendario);
  }

  accionDeClase(){
    return AccionClase.MODIFICAR;
  }
}

module.exports = ClaseEditable;