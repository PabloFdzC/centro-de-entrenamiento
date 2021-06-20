const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionIntervaloTiempo{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    return await this.#conexionBaseDatos.query('CALL CrearIntervaloTiempo(?,?,?,?)', [
      elem.horaInicio,
      elem.horaFinal,
      elem.minutoInicio,
      elem.minutoFinal
    ]);
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?',
      [valores]
      );
  }

  async eliminarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'DELETE FROM Jornada WHERE (id_jornada) IN (?)',
      [valores]
      );
  }
  
  async mostrarIntervaloXIdClase(idClase){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetHorarioClase(?)',
      [idClase]);
    return r[0];
  }
  
}

module.exports = TransaccionIntervaloTiempo;