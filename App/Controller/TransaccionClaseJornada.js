const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionClaseJornada{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Clases_en_Jornada(id_clase, id_intervalo, id_jornada) VALUES ?',
      [valores], true
      );
  }
  
}

module.exports = TransaccionClaseJornada;