const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionCliente{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    return await this.#conexionBaseDatos.query('CALL RegistroCliente(?,?,?,?,?,?,?,?,?)', [
      elem.email,
      elem.identificacion,
      elem.primerNombre,
      elem.segundoNombre,
      elem.primerApellido,
      elem.segundoApellido,
      elem.fechaNacimiento,
      elem.contrasenna,
      elem.telefono
    ]);
  }

  async consultar(email){
    return await this.#conexionBaseDatos.query('CALL GetCliente(?)', [email]);
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query('CALL modificarCliente(?,?,?,?,?,?,?,?)', [
      elem.email,
      elem.identificacion,
      elem.primerNombre,
      elem.segundoNombre,
      elem.primerApellido,
      elem.segundoApellido,
      elem.fechaNacimiento,
      elem.contrasenna,
      elem.telefono
    ]);
  }

  async mostrarTodos(){
    return await this.#conexionBaseDatos.query(
      'CALL GetClientes()',
      []
      );
  }

  async modificarContrasenna(elem){
    return await this.#conexionBaseDatos.query(
      'CALL modificarContrasennaCliente(?,?)',
      [elem.email, elem.contrasenna]
      );
  }

}

module.exports = TransaccionCliente;