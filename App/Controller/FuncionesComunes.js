const connection = require("connection.js");
const Clase = require("../Model/Clase.js");
const Instructor = require("../Model/Instructor.js");
const IntervaloTiempo = require("../Model/IntervaloTiempo.js");
const Jornada = require("../Model/Jornada.js");
const Servicio = require("../Model/Servicio.js");

export function jornadasDeSala(id){
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

  export function clasesDeJornada(id){
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

  export function getInstructor(email){
    connection.query('CALL GetInstructor(?)',[email], function(error, result){
      if(error){
        console.log("error: ", error);
        return undefined;
      }else{
        instructorresult = result[0][0];
        listaServicios = serviciosDeInstructor(email);
        instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
        return instructor;
      }
    });
  }

  export function serviciosDeInstructor(email){
    connection.query('CALL GetServiciosDeInstructor(?)',[email], function(error, result){
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
  }

  export function serviciosDeSala(id){
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
  }

  export function getMatriculasClase(id){
    connection.query('CALL GetMatriculasClase(?)',[id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        listaclientesresult = result[0];
        var i;
        var listaClientes = [];
        for(i = 0; i < listaclientesresult.length; i++){
          clienteresult = listaclientesresult[i];
          cliente = new Instructor(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
          listaClientes.push(cliente);
        }
        console.log({listaClientes});
        return listaClientes;
      }
    });
  }