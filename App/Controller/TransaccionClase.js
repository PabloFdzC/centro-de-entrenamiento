const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionClase{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async agregar(elem){
    var r = await this.#conexionBaseDatos.query('CALL CrearClase(?,?,?,?,?)', [
      elem.idSala,
      elem.capacidad,
      elem.servicio,
      elem.estado,
      elem.instructor
    ]);
    return r[0][0].id_clase;
  }

  async consultarEstado(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClasesEstado(?,?)',
      [elem.estado, elem.instructor]
      );
    return r[0];
  }

  async consultar(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClase(?)',
      [elem.id]
      );
    return r[0][0];
  }

  async modificar(elem){
    return await this.#conexionBaseDatos.query('CALL ModificarClase(?,?,?,?,?,?,?,?)', [
      elem.idSala,
      elem.idClase,
      elem.capacidad,
      elem.servicio,
      elem.estado,
      elem.instructor,
      elem.instructorTemporal,
      elem.vistoPorInstructor
    ]);
  }

  async eliminar(elem){
    return await this.#conexionBaseDatos.query('CALL EliminarClase(?)', [
      elem.idClase
    ]);
  }

  async eliminarEnJornada(elem){
    return await this.#conexionBaseDatos.query('CALL EliminarClaseEnJornada(?)', [
      elem.idClaseJornada
    ]);
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

  async mostrarJornadasDisponibles(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetJornadasDisponibles(?,?,?,?,?,?,?)',
      [
        elem.idSala,
        elem.idClase,
        elem.dia,
        elem.horaInicio,
        elem.horaFinal,
        elem.minutoInicio,
        elem.minutoFinal
      ]);
      return r[0];
  }

  async mostrarIntervalosClase(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetIntervalosClase(?)',
      [elem.idClase]
      );
      return r[0];
  }

  async modificarIntervalosClase(valores){
    return await this.#conexionBaseDatos.query(
      `INSERT INTO Intervalo_Tiempo(id_intervalo,hora_inicio,hora_final,minuto_inicio,minuto_final) VALUES ?
      ON DUPLICATE KEY UPDATE 
      hora_inicio = VALUES(hora_inicio),
      hora_final = VALUES(hora_final),
      minuto_inicio = VALUES(minuto_inicio),
      minuto_final = VALUES(minuto_final);`,
      [valores], true
      );
  }

  async modificarMuchas1Campo(valores, celda, valor){
    return await this.#conexionBaseDatos.query(
      `UPDATE Clase SET `+celda+` = `+valor+` WHERE id_clase IN (?);`,
      [valores], true
      );
  }

  async mostrarHorariosClase(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetHorariosClase(?)',
      [elem.idClase]
      );
      return r[0];
  }

}

module.exports = TransaccionClase;