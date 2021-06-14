const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionSala{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearSala(?,?,?)',[elem.costo, elem.capacidad, elem.aforo], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async serviciosDeSala(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetServiciosDeSala(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });

  }

  async consultar(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL SelectSala(?)',[id], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async consultarSalas(){
    return new Promise(function(resolve, reject){
      connection.query('CALL SelectSalas()',[], async function(error, result){
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
      connection.query('CALL editarSala(?,?,?,?)',[elem.idSala, elem.costo, elem.capacidad, elem.aforo], function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
      });
    });
  }

  async crearCalendario(elem){
    return new Promise(function(resolve, reject){
        connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[elem.horaInicio, elem.horaFinal, elem.minutoInicio, elem.minutoFinal], async function(error, result){
          if(error){
            reject(error);
          }else{
            resolve(result);
          }
        });
    });
  }

  async crearCalendarioAux(values){
    return new Promise(function(resolve, reject){
      connection.query("INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?",[values], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  crearCalendarioAux2(values){
    return new Promise(function(resolve, reject){
        connection.query("INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala) VALUES ?",[values], function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
        });
    });
  }

  modificarCalendario(values){
    return new Promise(function(resolve, reject){
      connection.query("DELETE FROM Jornada WHERE (id_jornada) IN (?)",[values], function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
      });
    });
  }

  modificarCalendarioAux(elem){
    return new Promise(function(resolve, reject){
        connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[elem.horaInicio, elem.horaFinal, elem.minutoInicio, elem.minutoFinal], function(error, result){
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
  }

  modificarCalendarioAux2(values){
    return new Promise(function(resolve, reject){
          connection.query("INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?",[values], function(error, result){
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
          });
    });
  }

  modificarCalendarioAux3(values){
    return new Promise(function(resolve, reject){
      connection.query("INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala) VALUES ?",[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  

  async serviciosDeSala(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetServiciosDeSala(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });

  }

  async jornadasDeSala(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetJornadasDeSala(?)',[id], async function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
      });
    });
  }

  async jornadasDeMes(mes){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetJornadasMes(?)',[mes], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async clasesDeJornada(id){
    var ctrlInstr = this.#ctrlInstructor;
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClasesEnJornada(?)',[id], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  crearServiciosDeSala(values){
    return new Promise(function(resolve, reject){
      connection.query("INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio) VALUES ?",[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  modificarServiciosDeSala(values){
    return new Promise(function(resolve, reject){
      connection.query("DELETE FROM Servicios_de_Sala WHERE (id_sala, nombre_servicio) IN (?)",[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  modificarServiciosDeSalaAux(values){
    return new Promise(function(resolve, reject){
        connection.query("INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio) VALUES ?",[values], function(error, result){
        if(error){
            reject(error);
        }else{
            resolve(result);
        }
        });
    });
  }

}

module.exports = ConexionSala;