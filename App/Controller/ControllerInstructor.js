const Instructor = require("../Model/Instructor");
const connection = require("connection.js");
import * as funcionesComunes from 'FuncionesComunes.js'

class ControllerInstructor{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
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
    connection.query('CALL GetInstructor(?)',[elem.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        instructorresult = result[0][0];
        listaServicios = funcionesComunes.serviciosDeInstructor(email);
        instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
        res.render('Perfil.ejs', instructor);
      }
    });
  }

  modificar(elem, res){
    connection.query('CALL modificarInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
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
      connection.query('CALL eliminarInstructor(?)',[elem.email], function(error, result){
        if(error){
          console.log("error: ", error);
          res.send([[{"error_message": error.message}]]);
        }else{
          console.log( "exito: ", result);
          return result;
        }
      });
  }

  mostrarInstructores(res){
    connection.query('CALL GetInstructores()',[], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        listainstructoresresult = result[0]
        var i;
        var listaInstructores = [];
        for(i = 0; i < listainstructoresresult.length; i++){
          instructorresult = listainstructoresresult[i];
          listaServicios = funcionesComunes.serviciosDeInstructor(instructorresult.email);
          instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
          listaInstructores.push(instructor);
        }
        res.render('Instructores.ejs', {lista: listaInstructores});
      }
    });
  }

}

module.exports = ControllerInstructor;