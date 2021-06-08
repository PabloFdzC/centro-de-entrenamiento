const connection = require("connection.js");
const Clase = require("../Model/Clase");
const EstadoClase = require("../Model/EstadoClase");
const Instructor = require("../Model/Instructor");
const IntervaloTiempo = require("../Model/IntervaloTiempo");
const Servicio = require("../Model/Servicio");
const Cliente = require("../Model/Cliente");
import * as funcionesComunes from 'FuncionesComunes.js'


class ControllerClase{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL CrearClase(?,?,?,?,?,?)',[elem.capacidad, elem.nombreServicio, EstadoClase["AGENDADA"], elem.idJornada, elem.idIntervalo, elem.emailInstructor], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  consultar(elem, res){
      connection.query('CALL GetClase(?)',[elem.id], function(error, result){
        if(error){
          console.log("error: ", error);
          res.send([[{"error_message": error.message}]]);
        }else{
          claseresult = result[0][0];
          listaServiciosInstructor = funcionesComunes.serviciosDeInstructor(claseresult.email);
          instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
          instructor_temporal = claseresult.email_instructor_temporal;
          if(instructor_temporal){
            instructor_temporal = funcionesComunes.getInstructor(claseresult.email_instructor_temporal);
          }
          servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
          intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
          matriculas = funcionesComunes.getMatriculasClase(claseresult.id_clase);
          clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
          console.log({clase});
        }
      });
  }

  modificar(elem, res){
    connection.query('CALL ModificarClase(?,?,?,?,?)',[elem.id, elem.capacidad, elem.nombreServicio, elem.estado_clase, elem.emailInstructor], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  eliminar(elem, res){
    
  }

  clasesPorMes(elem, res){
    connection.query('CALL GetClasesMes(?)',[elem.mes], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        listaclasesresult = result[0];
        var i;
        var listaClases = [];
        for(i = 0; i < listaclasesresult.length; i++){
          claseresult = listaclasesresult[i];
          listaServiciosInstructor = funcionesComunes.serviciosDeInstructor(claseresult.email);
          instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
          instructor_temporal = claseresult.email_instructor_temporal;
          if(instructor_temporal){
            instructor_temporal = funcionesComunes.getInstructor(claseresult.email_instructor_temporal);
          }
          servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
          intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
          matriculas = funcionesComunes.getMatriculasClase(claseresult.id_clase);
          clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
          listaClases.push(clase);
        }
        console.log({listaClases});
      }
    });
  }

  listadoReservas(elem, res){
    connection.query('CALL GetMatriculasClase(?)',[elem.id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        listaclientesresult = result[0];
        var i;
        var listaClientes = [];
        for(i = 0; i < listaclientesresult.length; i++){
          clienteresult = listaclientesresult[i];
          cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
          listaClientes.push(cliente);
        }
        console.log({listaClientes});
        res.render('Clientes.ejs', {lista: listaClientes});
      }
    });
  }

  matricularClase(elem, res){
    connection.query('CALL MatricularClase(?,?)',[elem.idClase, elem.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  cancelarMatricula(elem, res){
    connection.query('CALL CancelarMatricula(?,?)',[elem.idClase, elem.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  agregarInstructorTemporal(elem, res){
    connection.query('CALL AgregarInstructorTemporal(?,?)',[elem.idClase, elem.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

}

module.exports = ControllerClase;