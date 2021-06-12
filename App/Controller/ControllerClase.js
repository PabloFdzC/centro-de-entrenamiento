const connection = require("./ConexionBaseDatos.js");
const Clase = require("./../Model/Clase");
const EstadoClase = require("./../Model/EstadoClase");
const Instructor = require("./../Model/Instructor");
const IntervaloTiempo = require("./../Model/IntervaloTiempo");
const Servicio = require("./../Model/Servicio");
const Cliente = require("./../Model/Cliente");

class ControllerClase{
  #ctrlInstructor = null;
  
  constructor(ctrlInstr){
    this.#ctrlInstructor = ctrlInstr;
  }

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearClase(?,?,?,?,?,?)',[elem.capacidad, elem.nombreServicio, EstadoClase["AGENDADA"], elem.idJornada, elem.idIntervalo, elem.emailInstructor], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async consultar(elem){
    let ctrlInstructor = this.#ctrlInstructor;
    var ctrlClase = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClase(?)',[elem.id], function(error, result){
        if(error){
          reject(error);
        }else{
          var claseresult = result[0][0];
          var listaServiciosInstructor = ctrlInstructor.serviciosDeInstructor(claseresult.email);
          var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
          var instructor_temporal = claseresult.email_instructor_temporal;
          if(instructor_temporal){
            instructor_temporal = ctrlInstructor.getInstructor(claseresult.email_instructor_temporal);
          }
          var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
          var intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
          var matriculas = ctrlClase.getMatriculasClase(claseresult.id_clase);
          var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
          resolve(clase);
        }
      });
    });
  }

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL ModificarClase(?,?,?,?,?)',[elem.id, elem.capacidad, elem.nombreServicio, elem.estado_clase, elem.emailInstructor], function(error, result){
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

  async clasesPorMes(mes){
    let ctrlInstructor = this.#ctrlInstructor;
    var ctrlClase = this;
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClasesMes(?)',[mes], function(error, result){
        if(error){
          reject(error);
        }else{
          var listaclasesresult = result[0];
          var i;
          var listaClases = [];
          for(i = 0; i < listaclasesresult.length; i++){
            var claseresult = listaclasesresult[i];
            var listaServiciosInstructor = ctrlInstructor.serviciosDeInstructor(claseresult.email);
            var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, listaServiciosInstructor);
            var instructor_temporal = claseresult.email_instructor_temporal;
            if(instructor_temporal){
              instructor_temporal = ctrlInstructor.getInstructor(claseresult.email_instructor_temporal);
            }
            var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
            var intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
            var matriculas = ctrlClase.getMatriculasClase(claseresult.id_clase);
            var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, matriculas);
            listaClases.push(clase);
          }
          resolve(listaClases);
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
          var listaclientesresult = result[0];
          var i;
          var listaClientes = [];
          for(i = 0; i < listaclientesresult.length; i++){
            let clienteresult = listaclientesresult[i];
            var cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
            listaClientes.push(cliente);
          }
          resolve(listaClientes);
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
          var listaclientesresult = result[0];
          var i;
          var listaClientes = [];
          for(i = 0; i < listaclientesresult.length; i++){
            let clienteresult = listaclientesresult[i];
            var cliente = new Instructor(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
            listaClientes.push(cliente);
          }
          resolve(listaClientes);
        }
      });
    });
  }

}

module.exports = ControllerClase;