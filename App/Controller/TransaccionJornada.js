const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionJornada{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async consultar(id){
    var r = await this.#conexionBaseDatos.query('CALL GetJornada(?)', [id]);
    return r[0][0];
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala) VALUES ?',
      [valores]
      );
  }

  async eliminarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'DELETE FROM Jornada WHERE (id_jornada) IN (?)',
      [valores]
      );
  }

  async mostrarCalendario(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetJornadasSalaMes(?,?)',
      [elem.idSala, elem.mes]
      );
    return r[0];
  }

  async mostrarClasesJornada(id){
    var r = await this.#conexionBaseDatos.query('CALL GetClasesEnJornada(?)', [id]);
    return r[0];
  }

  async cantidadClasesDeJornada(id){
    var r = await this.#conexionBaseDatos.query('CALL GetCantidadClasesJornada(?)', [id]);
    return r[0][0].cantidad_clases;
  }

}

module.exports = TransaccionJornada;