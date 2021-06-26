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
      elem.instructor
    ]);
    return r[0][0].id_clase;
  }

  async consultarEstado(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClasesEstado(?)',
      [elem.estado]
      );
    return r[0];
  }

  async consultarPublicadasInstructor(elem){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetClasesPublicadasInstructor(?)',
      [elem.email]
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
    return await this.#conexionBaseDatos.query('CALL ModificarClase(?,?,?,?,?,?)', [
      elem.idClase,
      elem.capacidad,
      elem.servicio,
      elem.estado,
      elem.instructor,
      elem.instructorTemporal
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

}

module.exports = TransaccionClase;