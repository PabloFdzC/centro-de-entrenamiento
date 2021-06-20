const Instructor = require("./../Model/Instructor.js");
const ArreglaFechas = require("./ArreglaFechas.js");
const TransaccionInstructor = require("./TransaccionInstructor.js");

class ControllerInstructor{
  #transaccionInstructor = null;
  #controllerServicioInstructor = null;
  
  constructor(controllerServicioInstructor){
    this.#transaccionInstructor = new TransaccionInstructor();
    this.#controllerServicioInstructor = controllerServicioInstructor;
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
    return password;
  }

  async consultar(email){
    let instructorresult = await this.#transaccionInstructor.consultar(email);
    var listaServicios = await this.#controllerServicioInstructor.mostrarTodosXEmail(email);
    var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, ArreglaFechas.baseParaFecha(instructorresult.fecha_nacimiento), instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
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
      var instructor = new Instructor(instructorresult.primer_nombre, instructorresult.segundo_nombre, instructorresult.primer_apellido, instructorresult.segundo_apellido, ArreglaFechas.baseParaFecha(instructorresult.fecha_nacimiento), instructorresult.telefono, instructorresult.email, instructorresult.identificacion, listaServicios);
      listaInstructores.push(instructor);
    }
    return listaInstructores;
  }

  async modificarContrasenna(elem){
    var result = await this.#transaccionInstructor.modificarContrasenna(elem);
    return result;
  }

}

module.exports = ControllerInstructor;