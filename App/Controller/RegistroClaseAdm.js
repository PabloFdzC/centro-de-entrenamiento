const EstadoClase = require("../Model/EstadoClase");

class RegistroClaseAdm{
  agregar(elem){
    elem.estado = EstadoClase.PUBLICADA;
    return elem;
  }
}

module.exports = RegistroClaseAdm;