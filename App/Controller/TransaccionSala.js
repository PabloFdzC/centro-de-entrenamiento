const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionSala{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL CrearSala(?,?,?)',
      [elem.costo, elem.capacidad, elem.aforo]
      );
      return r[0][0].id_sala;
  }

  async consultar(id){
    var r = await this.#conexionBaseDatos.query('CALL SelectSala(?)', [id]);
    return r[0][0];
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query('CALL editarSala(?,?,?,?)', [
      elem.idSala,
      elem.costo,
      elem.capacidad,
      elem.aforo
    ]);
  }

  async mostrarTodos(){
    var r = await this.#conexionBaseDatos.query('CALL SelectSalas()', []);
    return r[0];
  }

}

module.exports = TransaccionSala;