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

  //async serviciosDeInstructor(email){
    //return await this.#conexionBaseDatos.query('CALL GetServiciosDeInstructor(?)', [email]);
  //}

  // async crearServiciosDeInstructor(values){
  //   return await this.#conexionBaseDatos.query(
  //     "INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?",
  //     [values]
  //     );
  // }

  // async modificarServiciosDeInstructor(email, serviciosBorrar, servicios){
  //   return await this.#conexionBaseDatos.query(
  //     "DELETE FROM Servicios_de_Instructor WHERE (email_instructor, nombre_servicio) IN (?)",
  //     [values]
  //     );
  // }

  // async modificarServiciosDeInstructorAux(values){
  //   return await this.#conexionBaseDatos.query(s, params);
  //   return new Promise(function(resolve, reject){
  //     connection.await this.#conexionBaseDatos.query("INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?",[values], function(error, result){
  //       if(error){
  //         reject(error);
  //       }else{
  //         resolve(result);
  //       }
  //     });
  //   });
  // }

  async modificarContrasenna(elem){
    return await this.#conexionBaseDatos.query(
      'CALL modificarContrasennaInstructor(?,?)',
      [elem.email, elem.contrasenna]
      );
  }

}

module.exports = TransaccionInstructor;