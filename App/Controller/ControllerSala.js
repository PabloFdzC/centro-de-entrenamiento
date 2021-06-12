const connection = require("./ConexionBaseDatos.js");
const Servicio = require("./../Model/Servicio.js");
const Clase = require("./../Model/Clase.js");
const Instructor = require("./../Model/Instructor.js");
const IntervaloTiempo = require("./../Model/IntervaloTiempo.js");
const Jornada = require("./../Model/Jornada.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{

  #ctrlInstructor;
  
  constructor(ctrlInstructor){
    this.#ctrlInstructor = ctrlInstructor;
  }

  async agregar(elem){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearSala(?,?,?)',[elem.costo, elem.capacidad, elem.aforo], function(error, result){
        if(error){
          reject(error);
        }else{
          try{
            ctrlSala.crearServiciosDeSala(result.id_sala, elem.servicios);
            ctrlSala.crearCalendario(result.id_sala, elem.servicios);
            resolve(result);
          }catch(err){
            reject(error);
          }
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
          var listaserviciosresult = result[0];
          var i;
          var listaServicios = [];
          for(i = 0; i < listaserviciosresult.length; i++){
            var servicioresult = listaserviciosresult[i];
            var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
            listaServicios.push(servicio);
          }
          resolve(listaServicios);
        }
      });
    });

  }

  async consultar(id){
    var ctrlSala= this;
    return new Promise(function(resolve, reject){
      connection.query('CALL SelectSala(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          var salaresult = result[0][0];
          var listaJornadas = ctrlSala.jornadasDeSala(salaresult.id_sala);
          var listaServicios = ctrlSala.serviciosDeSala(salaresult.id_sala);
          var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
          resolve(sala);
        }
      });
    });
  }

  async consultarSalas(elem){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL SelectSalas()',[], function(error, result){
        if(error){
          reject(error);
        }else{
          var salalistaresult = result[0];
          var i;
          var listaSalas = [];
          for(i = 0; i < salalistaresult.length; i++){
            var salaresult = salalistaresult[i];
            var listaJornadas = ctrlSala.jornadasDeSala(salaresult.id_sala);
            var listaServicios = ctrlSala.serviciosDeSala(salaresult.id_sala);
            var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula/*, listaJornadas, listaServicios*/);
            listaSalas.push(sala);
          }
          resolve(listaSalas);
        }
      });
    });
  }

  async modificar(elem){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL editarSala(?,?,?,?)',[elem.idSala, elem.costo, elem.capacidad, elem.aforo], function(error, result){
        if(error){
          reject(error);
        }else{
          try{
            ctrlSala.modificarServiciosDeSala(elem.idSala, elem.serviciosE, elem.serviciosA);
            ctrlSala.modificarCalendario(elem.idSala, elem.calendarioE);
            resolve(result);
          }catch(err){
            reject()
          }
        }
      });
    });
  }

  //elem es una lista
  async crearCalendario(elem, id){
    return new Promise(function(resolve, reject){
      if(elem.length > 0){
        connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[elem[0].horaInicio, elem[0].horaFinal, elem[0].minutoInicio, elem[0].minutoFinal], function(error, result){
          if(error){
            reject(error);
          }else{
            if(!result.id_intervalo){
              reject(result);
            }
            var id_primer_intervalo = result.id_intervalo;
            var sql = "INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?";
            var values = [];
            var i;
            var value;
            for(i = 1; i < elem.length; i++){
              value = [elem[i].horaInicio, elem[i].horaFinal, elem[i].minutoInicio, elem[i].minutoFinal];
              values.push(value);
            }
            connection.query(sql,[values], function(error, result){
              if(error){
                reject(error);
              }else{
                sql = "INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala) VALUES ?";
                values = [];
                var mes;
                var nuevoDia;
                var mismoMes;
                var j;
                for(i = 0; i < elem.length; i++){
                  mes = elem[i].dia.getMonth();
                  if(elem[i].repeticion == "CADASEMANADELMES"){
                    j = 7;
                    while(dia.getDate() - j > 0){
                      nuevoDia = new Date();
                      nuevoDia.setMonth(dia.getMonth());
                      nuevoDia.setFullYear(dia.getFullYear());
                      nuevoDia.setDate(dia.getDate() - j);
                      values.push([nuevoDia, id_primer_intervalo + i, id]);
                      j += 7;
                    }
                    j = 0;
                    mismoMes = true;
                    while(mismoMes){
                      nuevoDia = new Date();
                      nuevoDia.setMonth(dia.getMonth());
                      nuevoDia.setFullYear(dia.getFullYear());
                      nuevoDia.setDate(dia.getDate() + j);
                      if(nuevoDia.getMonth() == mes){
                        values.push([nuevoDia, id_primer_intervalo + i, id]);
                      }
                      else{
                        mismoMes = false;
                      }
                      j += 7;
                    }
                  }
                  else if(elem[i].repeticion == "TODOSLOSDIASDELMES"){
                    mismoMes = true;
                    j = 1;
                    while(mismoMes){
                      nuevoDia = new Date();
                      nuevoDia.setMonth(dia.getMonth());
                      nuevoDia.setFullYear(dia.getFullYear());
                      nuevoDia.setDate(j);
                      if(nuevoDia.getMonth() == mes){
                        values.push([nuevoDia, id_primer_intervalo + i, id]);
                      }
                      else{
                        mismoMes = false;
                      }
                      j += 1;
                    }
                  }
                  else{
                    values.push([elem[i].dia, id_primer_intervalo + i, id]);
                  }
                }
                connection.query(sql,[values], function(error, result){
                  if(error){
                    reject(error);
                  }else{
                    resolve(result);
                  }
                });
              }
            });
          }
        });
      } else{
        reject({code: 0});
      }
    });
  }

  modificarCalendario(id, calendarioA, calendarioE){
    return new Promise(function(resolve, reject){
      var sql = "DELETE FROM Jornada WHERE (id_jornada) IN (?)";
      var values = [];
      var i;
      var value;
      for(i = 0; i < calendarioE.length; i++){
        value = [calendarioE[i]];
        values.push(value);
      }
      connection.query(sql,[values], function(error, result){
        if(error){
          reject(error);
        }else{
          if(calendarioA.length > 0){
            connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[calendarioA[0].horaInicio, calendarioA[0].horaFinal, calendarioA[0].minutoInicio, calendarioA[0].minutoFinal], function(error, result){
              if(error){
                reject(error);
              }else{
                if(!result.id_intervalo){
                  reject(result);
                }
                var id_primer_intervalo = result.id_intervalo;
                var sql = "INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?";
                var values = [];
                var i;
                var value;
                for(i = 1; i < calendarioA.length; i++){
                  value = [calendarioA[i].horaInicio, calendarioA[i].horaFinal, calendarioA[i].minutoInicio, calendarioA[i].minutoFinal];
                  values.push(value);
                }
                connection.query(sql,[values], function(error, result){
                  if(error){
                    reject(error);
                  }else{
                    sql = "INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala) VALUES ?";
                    values = [];
                    var mes;
                    var nuevoDia;
                    var mismoMes;
                    var j;
                    for(i = 0; i < calendarioA.length; i++){
                      mes = calendarioA[i].dia.getMonth();
                      if(calendarioA[i].repeticion == "CADASEMANADELMES"){
                        j = 7;
                        while(dia.getDate() - j > 0){
                          nuevoDia = new Date();
                          nuevoDia.setMonth(dia.getMonth());
                          nuevoDia.setFullYear(dia.getFullYear());
                          nuevoDia.setDate(dia.getDate() - j);
                          values.push([nuevoDia, id_primer_intervalo + i, id]);
                          j += 7;
                        }
                        j = 0;
                        mismoMes = true;
                        while(mismoMes){
                          nuevoDia = new Date();
                          nuevoDia.setMonth(dia.getMonth());
                          nuevoDia.setFullYear(dia.getFullYear());
                          nuevoDia.setDate(dia.getDate() + j);
                          if(nuevoDia.getMonth() == mes){
                            values.push([nuevoDia, id_primer_intervalo + i, id]);
                          }
                          else{
                            mismoMes = false;
                          }
                          j += 7;
                        }
                      }
                      else if(calendarioA[i].repeticion == "TODOSLOSDIASDELMES"){
                        mismoMes = true;
                        j = 1;
                        while(mismoMes){
                          nuevoDia = new Date();
                          nuevoDia.setMonth(dia.getMonth());
                          nuevoDia.setFullYear(dia.getFullYear());
                          nuevoDia.setDate(j);
                          if(nuevoDia.getMonth() == mes){
                            values.push([nuevoDia, id_primer_intervalo + i, id]);
                          }
                          else{
                            mismoMes = false;
                          }
                          j += 1;
                        }
                      }
                      else{
                        values.push([calendarioA[i].dia, id_primer_intervalo + i, id]);
                      }
                    }
                    connection.query(sql,[values], function(error, result){
                      if(error){
                        reject(error);
                      }else{
                        resolve(result);
                      }
                    });
                  }
                });
              }
            });
          } else{
            reject({code: 0});
          }
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
          var listaserviciosresult = result[0];
          var i;
          var listaServicios = [];
          for(i = 0; i < listaserviciosresult.length; i++){
            var servicioresult = listaserviciosresult[i];
            var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
            listaServicios.push(servicio);
          }
          resolve(listaServicios);
        }
      });
    });

  }

  async jornadasDeSala(id){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL GetJornadasDeSala(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          var listajornadasresult = result[0];
          var i;
          var listajornadas =[];
          for(i = 0; i < listajornadasresult.length; i++){
            var jornadaresult = listajornadasresult[i];
            var intervalo = new IntervaloTiempo(jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
            var listaclases = ctrlSala.clasesDeJornada(jornadaresult.id_jornada);
            var jornada = new Jornada(jornadaresult.id_jornada, jornadaresult.dia, intervalo, listaclases);
            listajornadas.push(jornada);
          }
          resolve(listajornadas);
        }
      });
    });
  }

  async jornadasDeMes(mes){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL GetJornadasMes(?)',[mes], async function(error, result){
        if(error){
          reject(error);
        }else{
          var listajornadasresult = result[0];
          var i;
          var listajornadas =[];
          for(i = 0; i < listajornadasresult.length; i++){
            var jornadaresult = listajornadasresult[i];
            var intervalo = new IntervaloTiempo(jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
            var listaclases = await ctrlSala.clasesDeJornada(jornadaresult.id_jornada);
            var jornada = new Jornada(jornadaresult.id_jornada, jornadaresult.dia, intervalo, listaclases);
            listajornadas.push(jornada);
          }
          resolve(listajornadas);
        }
      });
    });
  }

  async clasesDeJornada(id){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClasesEnJornada(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          var listaclasesresult = result[0];
          var i;
          var listaClases = [];
          for(i = 0; i < listaclasesresult.length; i++){
            var claseresult = listaclasesresult[i];
            //var listaServiciosInstructor = serviciosDeInstructor(claseresult.email);
            var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, null);
            var instructor_temporal = claseresult.email_instructor_temporal;
            if(instructor_temporal){
              instructor_temporal = getInstructor(claseresult.email_instructor_temporal);
            }
            var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
            var intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
            //var matriculas = getMatriculasClase(claseresult.id_clase);
            var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, null);
            listaClases.push(clase);
          }
          resolve(listaClases);
        }
      });
    });
  }

  //servicios es una lista
  crearServiciosDeSala(id, servicios){
    return new Promise(function(resolve, reject){
      var sql = "INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio) VALUES ?";
      var values = [];
      var i;
      var value;
      for(i = 0; i < servicios.length; i++){
        value = [id, servicios[i]];
        values.push(value);
      }
      connection.query(sql,[values], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  modificarServiciosDeSala(id, serviciosBorrar, servicios){
    return new Promise(function(resolve, reject){
      var sql1 = "DELETE FROM Servicios_de_Sala WHERE (id_sala, nombre_servicio) IN (?)";
      var values1 = [];
      var i;
      var value;
      for(i = 0; i < serviciosBorrar.length; i++){
        value = [id, serviciosBorrar[i]];
        values1.push(value);
      }
      var sql2 = "INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio) VALUES ?";
      var values2 = [];
      for(i = 0; i < servicios.length; i++){
        value = [id, servicios[i]];
        values2.push(value);
      }
      connection.query(sql1,[values1], function(error, result){
        if(error){
          reject(error);
        }else{
          connection.query(sql2,[values2], function(error, result){
            if(error){
              reject(error);
            }else{
              resolve(result);
            }
          });
        }
      });
    });
  }


}

module.exports = ControllerSala;