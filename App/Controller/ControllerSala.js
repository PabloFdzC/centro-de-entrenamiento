const connection = require("./ConexionBaseDatos.js");
const Servicio = require("./../Model/Servicio.js");
const Clase = require("./../Model/Clase.js");
const Instructor = require("./../Model/Instructor.js");
const IntervaloTiempo = require("./../Model/IntervaloTiempo.js");
const Jornada = require("./../Model/Jornada.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearSala(?,?,?)',[elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
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
      connection.query('CALL SelectSala(?)',[id], function(error, result){
        if(error){
          reject(error);
        }else{
          var salaresult = result[0][0];
          var listaJornadas = jornadasDeSala(salaresult.id_sala);
          var listaServicios = serviciosDeSala(salaresult.id_sala);
          var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
          resolve(sala);
        }
      });
    });
  }

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL editarSala(?,?,?,?)',[elem.idSala, elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  eliminar(elem){
    
  }

  async crearCalendario(elem){
    var dia = new Date(elem.dia);
    var horaInicio = elem.horaInicio;
    var horaFinal = elem.horaFinal;
    var repeticion = elem.repeticion;
    var dias = [];
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[horaInicio, horaFinal, 0, 0], function(error, result){
        if(error){
          reject(error);
        }else{
          var mes = dia.getMonth();
          dias.push(dia);
          var nuevoDia;
          if(repeticion == "cadaSemana"){
            var mismoMes = true;
            var i = 7;
            while(mismoMes){
              nuevoDia = new Date();
              nuevoDia.setMonth(dia.getMonth());
              nuevoDia.setFullYear(dia.getFullYear());
              nuevoDia.setDate(dia.getDate() + i);
              if(nuevoDia.getMonth() == mes){
                dias.push(nuevoDia);
              }
              else{
                mismoMes = false;
              }
              i += 7;
            }
          }
          else if(repeticion == "todosLosDias"){
            var mismoMes = true;
            var i = 1;
            while(mismoMes){
              nuevoDia = new Date();
              nuevoDia.setMonth(dia.getMonth());
              nuevoDia.setFullYear(dia.getFullYear());
              nuevoDia.setDate(i);
              if(nuevoDia.getMonth() == mes){
                dias.push(nuevoDia);
              }
              else{
                mismoMes = false;
              }
              i += 1;
            }
          }
          var j;        
          for(j = 0; j < dias.length; j++){
            connection.query('CALL CrearJornadaCalendario(?,?)',[dia[j], elem.idSala], function(error, result){
              if(error){
                reject(error);
              }else{
                console.log( "exito: ", result);
              }
            });
          }
          resolve(result);
        }
      });
    });
  }

  modificarCalendario(elem){
    
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
            var listaclases = clasesDeJornada(jornadaresult.id_jornada);
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
            var listaServiciosInstructor = serviciosDeInstructor(claseresult.email);
            var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
            var instructor_temporal = claseresult.email_instructor_temporal;
            if(instructor_temporal){
              instructor_temporal = getInstructor(claseresult.email_instructor_temporal);
            }
            var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
            var intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
            var matriculas = getMatriculasClase(claseresult.id_clase);
            var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
            listaClases.push(clase);
          }
          resolve(listaClases);
        }
      });
    });
  }

}

module.exports = ControllerSala;