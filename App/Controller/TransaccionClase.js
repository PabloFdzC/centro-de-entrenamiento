const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionClase{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CALL CrearClase(?,?,?,?)', [
      elem.capacidad,
      elem.servicio,
      elem.estado,
      elem.emailInstructor
    ]);
    return r[0][0].id_clase;
  }

  async consultar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClase(?)',
      [elem.id]
      );
    return r[0][0];
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query('CALL ModificarClase(?,?,?,?,?)', [
      elem.id,
      elem.capacidad,
      elem.servicio,
      elem.estado_clase,
      elem.emailInstructor
    ]);
  }

  async eliminar(elem){
    return await this.#conexionBaseDatos.query(
      'CALL EliminarServicio(?)',
      [elem.id]
      );
  }

  async mostrarTodoXMes(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClasesMes(?,?)',
      [elem.mes, elem.sala]
      );
    return r[0];
  }

  async agregarInstructorTemporal(elem){
    return await this.#conexionBaseDatos.query(
      'CALL AgregarInstructorTemporal(?,?)',
      [elem.idClase, elem.email]
      );
  }

  async mostrarJornadasCrearClase(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetJornadasCrearClase(?,?,?,?,?,?)',
      [
        elem.idSala,
        elem.dia,
        elem.horaInicio,
        elem.horaFinal,
        elem.minutoInicio,
        elem.minutoFinal
      ]);
      return r[0];
  }

}

module.exports = TransaccionClase;