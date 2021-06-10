const Instructor = require("./../Model/Instructor");
const connection = require("./connection.js");

class ControllerInstructor{
  
  constructor(){}

  agregar(elem){
    var res;
    connection.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
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
    connection.query('CALL GetInstructor(?)',[elem.email], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        instructorresult = result[0][0];
        listaServicios = serviciosDeInstructor(email);
        instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
        res = instructor;
      }
    });
    return res;
  }

  modificar(elem){
    var res;
    connection.query('CALL modificarInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
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
    var res;
    connection.query('CALL eliminarInstructor(?)',[elem.email], function(error, result){
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

  mostrarInstructores(){
    var res;
    connection.query('CALL GetInstructores()',[], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        listainstructoresresult = result[0]
        var i;
        var listaInstructores = [];
        for(i = 0; i < listainstructoresresult.length; i++){
          instructorresult = listainstructoresresult[i];
          listaServicios = serviciosDeInstructor(instructorresult.email);
          instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
          listaInstructores.push(instructor);
        }
        res = listaInstructores;
      }
    });
    return res;
  }

  serviciosDeInstructor(email){
    var res;
    connection.query('CALL GetServiciosDeInstructor(?)',[email], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
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
        res = listaServicios;
      }
    });
    return res;
  }

  modificarContrasenna(elem){
    var res;
    connection.query('CALL modificarContrasennaInstructor(?,?)',[elem.email, elem.contrasenna], function(error, result){
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

}

module.exports = ControllerInstructor;