const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionCalendario{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async mostrarCalendario(elem){
    return await this.#conexionBaseDatos.query(
      'CALL GetJornadasSalaMes(?,?)',
      [elem.idSala, elem.mes]
      );
  }

  async mostrarJornada(id){
    var r = await this.#conexionBaseDatos.query('CALL GetJornada(?)', [id]);
    return r[0][0];
  }

  async cantidadClasesDeJornada(id){
    var r = await this.#conexionBaseDatos.query('CALL GetCantidadClasesJornada(?)', [id]);
    return r[0][0].cantidad_clases;
  }
}

module.exports = TransaccionCalendario;