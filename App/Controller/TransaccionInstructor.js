const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionInstructor{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem, password){
    return await this.#conexionBaseDatos.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?,?)', [
      elem.email,
      elem.identificacion,
      elem.primerNombre,
      elem.segundoNombre,
      elem.primerApellido,
      elem.segundoApellido,
      elem.fechaNacimiento,
      password, elem.telefono
    ]);
  }

  async consultar(email){
    var r = await this.#conexionBaseDatos.query('CALL GetInstructor(?)', [email]);
    return r[0][0];
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query('CALL modificarInstructor(?,?,?,?,?,?,?,?)', [
      elem.email,
      elem.identificacion,
      elem.primerNombre,
      elem.segundoNombre,
      elem.primerApellido,
      elem.segundoApellido,
      elem.fechaNacimiento,
      elem.telefono
    ]);
  }

  async eliminar(elem){
    return await this.#conexionBaseDatos.query('CALL eliminarInstructor(?)', [elem.email]);
  }

  async mostrarTodos(){
    return await this.#conexionBaseDatos.query('CALL GetInstructores()', []);
  }

  async modificarContrasenna(elem){
    return await this.#conexionBaseDatos.query(
      'CALL modificarContrasennaInstructor(?,?)',
      [elem.email, elem.contrasenna]
      );
  }

}

module.exports = TransaccionInstructor;