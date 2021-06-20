const ConexionSng = require("./ConexionBaseDatosSng.js");

class TransaccionServicioInstructor{
  #conexionBaseDatos = null;
  
  constructor(){
    let cnxSng = ConexionSng.getInstance();
    this.#conexionBaseDatos = cnxSng.getConexionBaseDatos();
  }

  async mostrarTodosXEmail(email){
    var r = await this.#conexionBaseDatos.query(
      'CALL GetServiciosDeInstructor(?)',
      [email]
      );
    return r[0];
  }

  async agregarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      'INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?',
      [valores]
      );
  }

  async eliminarMultiples(valores){
    return await this.#conexionBaseDatos.query(
      "DELETE FROM Servicios_de_Instructor WHERE (email_instructor, nombre_servicio) IN (?)",
      [valores]
      );
  }


}

module.exports = TransaccionServicioInstructor;