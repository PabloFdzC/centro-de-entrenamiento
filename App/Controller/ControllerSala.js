const connection = require("./connection.js");
const Servicio = require("./../Model/Servicio.js");
const Clase = require("./../Model/Clase.js");
const Instructor = require("./../Model/Instructor.js");
const IntervaloTiempo = require("./../Model/IntervaloTiempo.js");
const Jornada = require("./../Model/Jornada.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{
  
  constructor(){}

  agregar(elem){
    var res;
    connection.query('CALL CrearSala(?,?,?)',[elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

  consultar(elem){
    var res;
    connection.query('CALL SelectSala(?)',[elem.id], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        salaresult = result[0][0];
        console.log({salaresult});
        listaJornadas = jornadasDeSala(salaresult.id_sala);
        listaServicios = serviciosDeSala(salaresult.id_sala);
        sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula/*, listaJornadas, listaServicios*/);
        console.log({sala});
        res = sala;
      }
    });
    return res;
  }

  modificar(elem){
    var res;
    connection.query('CALL editarSala(?,?,?,?)',[elem.idSala, elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

  eliminar(elem){
    
  }

  crearCalendario(elem){
    var res;
    var dia = new Date(elem.dia);
    var horaInicio = elem.horaInicio;
    var horaFinal = elem.horaFinal;
    var repeticion = elem.repeticion;
    var dias = [];
    connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[horaInicio, horaFinal, 0, 0], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        mes = dia.getMonth();
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
              console.log("error: ", error);
              res = {"error_message": error.message};
            }else{
              console.log( "exito: ", result);
            }
          });
        }
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

  modificarCalendario(elem){
    
  }

  serviciosDeSala(id){
    var res;
    connection.query('CALL GetServiciosDeSala(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        return [];
      }else{
        listaserviciosresult = result[0];
        var i;
        var listaServicios = [];
        for(i = 0; i < listaserviciosresult.length; i++){
          servicioresult = listaserviciosresult[i];
          servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
          listaServicios.push(servicio);
        }
        console.log({listaServicios});
        return listaServicios;
      }
    });
    return res;
  }

  jornadasDeSala(id){
    connection.query('CALL GetJornadasDeSala(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        return [];
      }else{
        listajornadasresult = result[0];
        var i;
        var listajornadas =[];
        for(i = 0; i < listajornadasresult.length; i++){
          jornadaresult = listajornadasresult[i];
          intervalo = new IntervaloTiempo(jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
          listaclases = clasesDeJornada(jornadaresult.id_jornada);
          jornada = new Jornada(jornadaresult.id_jornada, jornadaresult.dia, intervalo, listaclases);
          listajornadas.push(jornada);
        }
        return listajornadas;
      }
    });
  }

  clasesDeJornada(id){
    connection.query('CALL GetClasesEnJornada(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        return [];
      }else{
        listaclasesresult = result[0];
        var i;
        var listaClases = [];
        for(i = 0; i < listaclasesresult.length; i++){
          claseresult = listaclasesresult[i];
          listaServiciosInstructor = serviciosDeInstructor(claseresult.email);
          instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
          instructor_temporal = claseresult.email_instructor_temporal;
          if(instructor_temporal){
            instructor_temporal = getInstructor(claseresult.email_instructor_temporal);
          }
          servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
          intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
          matriculas = getMatriculasClase(claseresult.id_clase);
          clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
          listaClases.push(clase);
        }
        console.log({listaClases});
        return listaClases;
      }
    });
  }

}

module.exports = ControllerSala;