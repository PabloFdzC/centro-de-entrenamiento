const AccionClase = require('../Model/AccionClase.js');

ClaseCalendarioDecorador = require('./ClaseCalendarioDecorador.js');

class ClaseSoloLectura extends ClaseCalendarioDecorador{
  
  constructor(claseCalendario){
    super(claseCalendario);
  }
  
  accionDeClase(){
    return AccionClase.VER;
  }
}

module.exports = ClaseSoloLectura;