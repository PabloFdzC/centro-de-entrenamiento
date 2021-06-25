const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionIntervaloTiempo{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CALL CrearIntervaloTiempo(?,?,?,?)', [
      elem.horaInicio,
      elem.horaFinal,
      elem.minutoInicio,
      elem.minutoFinal
    ]);
    return r[0][0].id_intervalo;
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?',
      [valores], true
      );
  }

  async eliminarMultiples(valores){
    console.log(valores);
    return await this.#conexionBaseDatos.query(
      'DELETE FROM Intervalo_Tiempo WHERE (id_intervalo) IN (?)',
      [valores], true
      );
  }
  
  async mostrarIntervaloXIdClase(idClase){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetHorarioClase(?)',
      [idClase]);
    return r[0];
  }

  async modificar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL ModificarIntervaloTiempo(?,?,?,?,?)',
      [
        elem.idIntervalo,
        elem.horaInicio,
        elem.minutoInicio,
        elem.horaFinal,
        elem.minutoFinal
      ]
    );
    return r;
  }
  
}

module.exports = TransaccionIntervaloTiempo;