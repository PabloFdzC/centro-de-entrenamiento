const Instructor = require("./../Model/Instructor.js");
const ArreglaFechas = require("./ArreglaFechas.js");
const TransaccionInstructor = require("./TransaccionInstructor.js");

class ControllerInstructor{
  #transaccionInstructor = null;
  #controllerServicioInstructor = null;
  #instructores = null;
  
  constructor(controllerServicioInstructor){
    this.#transaccionInstructor = new TransaccionInstructor();
    this.#controllerServicioInstructor = controllerServicioInstructor;
    this.#instructores = {};
  }

  async agregar(elem){
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 10; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    await this.#transaccionInstructor.agregar(elem, password);
    await this.#controllerServicioInstructor.agregarMultiples(elem);
    this.agregaMemoria(elem);
    return password;
  }

  async consultar(email){
    let instructorresult = await this.#transaccionInstructor.consultar(email);
    var listaServicios = await this.#controllerServicioInstructor.mostrarTodosXEmail(email);
    var instructor = this.agregaMemoria({
      primerNombre:instructorresult.primer_nombre,
      segundoNombre:instructorresult.segundo_nombre,
      primerApellido:instructorresult.primer_apellido,
      segundoApellido:instructorresult.segundo_apellido,
      fechaNacimiento:instructorresult.fecha_nacimiento,
      telefono:instructorresult.telefono,
      email:instructorresult.email,
      identificacion:instructorresult.identificacion,
      servicios:listaServicios
    });
    return instructor;
  }

  async modificar(elem){
    var result = await this.#transaccionInstructor.modificar(elem);
    await this.#controllerServicioInstructor.agregarMultiples(elem);
    await this.#controllerServicioInstructor.eliminarMultiples(elem);
    return result;
  }

  async eliminar(elem){
    var result = await this.#transaccionInstructor.eliminar(elem);
    return result;
  }

  async mostrarTodos(){
    var result = await this.#transaccionInstructor.mostrarTodos();
    var listainstructoresresult = result[0]
    var i;
    var listaInstructores = [];
    for(i = 0; i < listainstructoresresult.length; i++){
      let instructorresult = listainstructoresresult[i];
      let listaServicios = await this.#controllerServicioInstructor.mostrarTodosXEmail(instructorresult.email);
      var instructor = this.agregaMemoria({
        primerNombre:instructorresult.primer_nombre,
        segundoNombre:instructorresult.segundo_nombre,
        primerApellido:instructorresult.primer_apellido,
        segundoApellido:instructorresult.segundo_apellido,
        fechaNacimiento:instructorresult.fecha_nacimiento,
        telefono:instructorresult.telefono,
        email:instructorresult.email,
        identificacion:instructorresult.identificacion,
        servicios:listaServicios
      });
      listaInstructores.push(instructor);
    }
    return listaInstructores;
  }

  async modificarContrasenna(elem){
    var result = await this.#transaccionInstructor.modificarContrasenna(elem);
    return result;
  }

  agregaMemoria(elem = {primerNombre:null,segundoNombre:null,primerApellido:null,segundoApellido:null,fechaNacimiento:null,telefono:null,email:null,identificacion:null,servicios:null}){
    if(!(elem.email in this.#instructores)){
      this.#instructores[elem.email] = new Instructor(
        elem.primerNombre,
        elem.segundoNombre,
        elem.primerApellido,
        elem.segundoApellido,
        ArreglaFechas.stringAFecha(elem.fechaNacimiento),
        elem.telefono,
        elem.email,
        elem.identificacion,
        elem.servicios);
    } else {
      let i = this.#instructores[elem.email];
      if(elem.primerNombre != null && i.getPrimerNombre() != elem.primerNombre){
        i.setPrimerNombre(elem.primerNombre);
      }
      if(elem.segundoNombre != null && i.getSegundoNombre() != elem.segundoNombre){
        i.setSegundoNombre(elem.segundoNombre);
      }
      if(elem.primerApellido != null && i.getPrimerApellido() != elem.primerApellido){
        i.setPrimerApellido(elem.primerApellido);
      }
      if(elem.segundoApellido != null && i.getSegundoApellido() != elem.segundoApellido){
        i.setSegundoApellido(elem.segundoApellido);
      }
      if(elem.fechaNacimiento != null && ArreglaFechas.fechaAString(i.getFechaNacimiento()) != elem.fechaNacimiento){
        i.setFechaNacimiento(ArreglaFechas.stringAFecha(elem.fechaNacimiento));
      }
      if(elem.telefono != null && i.getTelefono() != elem.telefono){
        i.setTelefono(elem.telefono);
      }
      if(elem.identificacion != null && i.getIdentificacion() != elem.identificacion){
        i.setIdentificacion(elem.identificacion);
      }
      if(elem.servicios != null){
        i.setServicios(elem.servicios);
      }
    }
    return this.#instructores[elem.email];
  }

}

module.exports = ControllerInstructor;