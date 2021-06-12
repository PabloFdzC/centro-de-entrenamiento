const Instructor = require("./../Model/Instructor");
const connection = require("./ConexionBaseDatos.js");

class ControllerInstructor{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      var password = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;

      for ( var i = 0; i < 10; i++ ) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      connection.query('CALL RegistroInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, password, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          console.log(password);
          crearServiciosDeInstructor(elem.email, elem.servicios);
          resolve(password);
        }
      });
    });
  }

  async consultar(email){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetInstructor(?)',[email], function(error, result){
        if(error){
          reject(error);
        }else{
          let instructorresult = result[0][0];
          var listaServicios = serviciosDeInstructor(email);
          var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
          resolve(instructor);
        }
      });
    });
  }

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarInstructor(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          modificarServiciosDeInstructor(elem.email, elem.serviciosBorrar, elem.servicios);
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
      connection.query('CALL GetInstructores()',[], function(error, result){
        if(error){
          reject(error);
        }else{
          var listainstructoresresult = result[0]
          var i;
          var listaInstructores = [];
          for(i = 0; i < listainstructoresresult.length; i++){
            let instructorresult = listainstructoresresult[i];
            let listaServicios = serviciosDeInstructor(instructorresult.email);
            var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
            listaInstructores.push(instructor);
          }
          resolve(listaInstructores);
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
          listaserviciosresult = result[0];
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

  crearServiciosDeInstructor(email, servicios){
    return new Promise(function(resolve, reject){
      var sql = "INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?";
      var values = [];
      var i;
      var value;
      for(i = 0; i < servicios.length; i++){
        value = [email, servicios[i]];
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

  modificarServiciosDeInstructor(email, serviciosBorrar, servicios){
    return new Promise(function(resolve, reject){
      var sql1 = "DELETE FROM Servicios_de_Instructor WHERE (email_instructor, nombre_servicio) IN (?)";
      var values1 = [];
      var i;
      var value;
      for(i = 0; i < serviciosBorrar.length; i++){
        value = [email, serviciosBorrar[i]];
        values1.push(value);
      }
      var sql2 = "INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio) VALUES ?";
      var values2 = [];
      for(i = 0; i < servicios.length; i++){
        value = [email, servicios[i]];
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

module.exports = ControllerInstructor;