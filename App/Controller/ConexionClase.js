const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();
const EstadoClase = require("./../Model/EstadoClase");

class ConexionClase{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
        connection.query('CALL CrearClase(?,?,?,?,?,?)',[elem.capacidad, elem.servicio, EstadoClase["AGENDADA"], elem.idJornada, elem.idIntervalo, elem.emailInstructor], function(error, result){
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        });
      });
  }

  consultar(elem){
    return new Promise(function(resolve, reject){
        connection.query('CALL GetClase(?)',[elem.id], function(error, result){
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
        connection.query('CALL ModificarClase(?,?,?,?,?)',[elem.id, elem.capacidad, elem.servicio, elem.estado_clase, elem.emailInstructor], function(error, result){
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
      connection.query('CALL EliminarServicio(?)',[elem.id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async clasesPorMes(mes){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClasesMes(?)',[mes], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async listadoReservas(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetMatriculasClase(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async matricularClase(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL MatricularClase(?,?)',[elem.idClase, elem.email], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async cancelarMatricula(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CancelarMatricula(?,?)',[elem.idClase, elem.email], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async agregarInstructorTemporal(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL AgregarInstructorTemporal(?,?)',[elem.idClase, elem.email], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async getMatriculasClase(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetMatriculasClase(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionClase;