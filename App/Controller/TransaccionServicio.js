const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionServicios{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL CrearServicio(?,?)',
      [elem.nombre, elem.costo]
      );
  }
  
  async modificar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL ModificarServicio(?,?)',
      [elem.nombre, elem.costo]
      );
  }

  async eliminar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL EliminarServicio(?)',
      [elem.id]
      );
  }

  async mostrarTodos(){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetServicios()',
      []
      );
    return r[0];
  }

}

module.exports = TransaccionServicios;