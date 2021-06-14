const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionInstructor{
  
  constructor(){}

  async agregar(elem, password){
    return new Promise(function(resolve, reject){
      connection.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, password, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(password);
        }
      });
    });
  }

  async consultar(email){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetInstructor(?)',[email], async function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
      });
    });
  }

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], async function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
      });
    });
  }

  async eliminar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL eliminarInstructor(?)',[elem.email], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async mostrarInstructores(){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetInstructores()',[], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async serviciosDeInstructor(email){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetServiciosDeInstructor(?)',[email], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async crearServiciosDeInstructor(values){
    return new Promise(function(resolve, reject){
      connection.query("INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?",[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async modificarServiciosDeInstructor(email, serviciosBorrar, servicios){
    return new Promise(function(resolve, reject){
      connection.query("DELETE FROM Servicios_de_Instructor WHERE (email_instructor, nombre_servicio) IN (?)",[values], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async modificarServiciosDeInstructorAux(values){
    return new Promise(function(resolve, reject){
      connection.query("INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?",[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async modificarContrasenna(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarContrasennaInstructor(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionInstructor;