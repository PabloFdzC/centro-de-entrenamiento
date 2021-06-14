const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionClase = ConexionSng.getConexionClase();
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
    console.log(elem);
    try{
      var r = await ConexionClase.agregar(elem);
      return r;
    }catch(err){
      throw err;
    }
  }

  async consultar(elem){
    let ctrlInstructor = this.#ctrlInstructor;
    var ctrlClase = this;
    try{
      var result = await ConexionClase.consultar(elem);
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
      return clase;
    }catch(err){
      throw err;
    }
  }

  async modificar(elem){
    console.log(elem);
    try{
      var r = await ConexionClase.modificar(elem);
      return r;
    }catch(err){
      throw err;
    }
  }

  async clasesPorMes(mes){
    let ctrlInstructor = this.#ctrlInstructor;
    var ctrlClase = this;
    try{
      var result = await ConexionClase.clasesPorMes(mes);
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
      return listaClases;
    }catch(err){
      throw err;
    }
  }

  async listadoReservas(id){
    try{
      var result = await ConexionClase.modificar(id);
      var listaclientesresult = result[0];
      var i;
      var listaClientes = [];
      for(i = 0; i < listaclientesresult.length; i++){
        let clienteresult = listaclientesresult[i];
        var cliente = new Cliente(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        listaClientes.push(cliente);
      }
      return listaClientes;
    }catch(err){
      throw err;
    }
  }

  async matricularClase(elem){
    try{
      var r = await ConexionClase.matricularClase(elem);
      return r;
    }catch(err){
      throw err;
    }
  }

  async cancelarMatricula(elem){
    try{
      var r = await ConexionClase.cancelarMatricula(elem);
      return r;
    }catch(err){
      throw err;
    }
  }

  async agregarInstructorTemporal(elem){
    try{
      var r = await ConexionClase.agregarInstructorTemporal(elem);
      return r;
    }catch(err){
      throw err;
    }
  }

  async getMatriculasClase(id){
    try{
      var result = await ConexionClase.getMatriculasClase(id);
      var listaclientesresult = result[0];
      var i;
      var listaClientes = [];
      for(i = 0; i < listaclientesresult.length; i++){
        let clienteresult = listaclientesresult[i];
        var cliente = new Instructor(clienteresult.primer_nombre, clienteresult.segundo_nombre, clienteresult.primer_apellido, clienteresult.segundo_apellido, clienteresult.fecha_nacimiento, clienteresult.telefono, clienteresult.email, clienteresult.identificacion);
        listaClientes.push(cliente);
      }
      return listaClientes;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerClase;