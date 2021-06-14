const Instructor = require("./../Model/Instructor");
const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionInstructor = ConexionSng.getConexionInstructor();

class ControllerInstructor{
  
  constructor(){}

  async agregar(elem){
    var ctrlInstr = this;
    try{
      var password = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;

      for ( var i = 0; i < 10; i++ ) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      var result = await ConexionInstructor.agregar(elem, password);
      ctrlInstr.crearServiciosDeInstructor(elem.email, elem.servicios);
      return password;
    }catch(err){
      throw err;
    }
  }

  async consultar(email){
    var ctrlInstr = this;
    try{
      var result = await ConexionInstructor.consultar(email);
      let instructorresult = result[0][0];
      var listaServicios = await ctrlInstr.serviciosDeInstructor(email);
      var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
      return instructor;
    }catch(err){
      throw err;
    }
  }

  async modificar(elem){
    var ctrlInstr = this;
    try{
      var result = await ConexionInstructor.modificar(elem);
      await ctrlInstr.modificarServiciosDeInstructor(elem.email, elem.serviciosBorrar, elem.servicios);
      return result;
    }catch(err){
      throw err;
    }
  }

  async eliminar(elem){
    try{
      var result = await ConexionInstructor.eliminar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  async mostrarInstructores(){
    var ctrlInstr = this;
    try{
      var result = await ConexionInstructor.mostrarInstructores();
      var listainstructoresresult = result[0]
      var i;
      var listaInstructores = [];
      for(i = 0; i < listainstructoresresult.length; i++){
        let instructorresult = listainstructoresresult[i];Ç
        let listaServicios = await ctrlInstr.serviciosDeInstructor(instructorresult.email);
        var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, instructorresult.fecha_nacimiento, instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
        listaInstructores.push(instructor);
      }
      return listaInstructores;
    }catch(err){
      throw err;
    }
  }

  async serviciosDeInstructor(email){
    try{
      var result = await ConexionInstructor.serviciosDeInstructor(email);
      var listaserviciosresult = result[0];
      var i;
      var listaServicios = [];
      for(i = 0; i < listaserviciosresult.length; i++){
        var servicioresult = listaserviciosresult[i];
        var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
        listaServicios.push(servicio);
      }
      return listaServicios;
    }catch(err){
      throw err;
    }
  }

  async crearServiciosDeInstructor(email, servicios){
    var values = [];
    var i;
    var value;
    for(i = 0; i < servicios.length; i++){
      value = [email, servicios[i]];
      values.push(value);
    }
    try{
      var result = await ConexionInstructor.crearServiciosDeInstructor(values);
      return result;
    }catch(err){
      throw err;
    }
  }

  async modificarServiciosDeInstructor(email, serviciosBorrar, servicios){
    var values1 = [];
    var i;
    var value;
    for(i = 0; i < serviciosBorrar.length; i++){
      value = [email, serviciosBorrar[i]];
      values1.push(value);
    }
    var values2 = [];
    for(i = 0; i < servicios.length; i++){
      value = [email, servicios[i]];
      values2.push(value);
    }
    try{
      var result = await modificarServiciosDeInstructor.eliminar(values);
      var r = await modificarServiciosDeInstructorAux(values2);
      return r;
    }catch(err){
      throw err;
    }
  }

  async modificarServiciosDeInstructorAux(values){
    try{
      var result = await ConexionInstructor.modificarServiciosDeInstructorAux(values);
      return result;
    }catch(err){
      throw err;
    }
  }

  async modificarContrasenna(elem){
    try{
      var result = await ConexionInstructor.modificarContrasenna(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerInstructor;