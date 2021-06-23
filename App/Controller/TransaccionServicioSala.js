const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionServicioSala{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio) VALUES ?',
      [valores], true
      );
  }

  async eliminarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'DELETE FROM Servicios_de_Sala WHERE (id_sala, nombre_servicio) IN (?)',
      [valores], true
      );
  }

  async mostrarTodosXIdSala(id){
    return await this.#conexionBaseDatos.query('CALL GetServiciosDeSala(?)', [id]);
  }
}

module.exports = TransaccionServicioSala;