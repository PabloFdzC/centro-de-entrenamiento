const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionPago{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CALL CrearPago(?,?,?,?)',[
      elem.cantidad,
      elem.emailCliente,
      elem.idClase,
      elem.estado
    ]);
    return r[0][0].id_pago;
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL ModificarPago(?,?,?)',
      [elem.id, elem.formaPago, elem.estado]
      );
  }

  async eliminar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL EliminarPago(?)',
      [elem.id]
      );
  }

  async mostrarPendientes(elem){
    return await this.#conexionBaseDatos.query(
      'CALL GetPagosPendientes(?)',
      [elem.email]
      );
  }

}

module.exports = TransaccionPago;