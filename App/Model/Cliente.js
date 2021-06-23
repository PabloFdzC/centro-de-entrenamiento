const ArreglaFechas = require('../Controller/ArreglaFechas.js');
const EstadoPago = require('./EstadoPago.js');
Persona = require('./Persona.js');

class Cliente extends Persona{
  
  #estadoPago = null;

  constructor(primerNombre, segundoNombre, primerApellido, segundoApellido,
    fechaNacimiento, telefono, email, identificacion, estadoPago){
    super(primerNombre, segundoNombre, primerApellido, segundoApellido,
      fechaNacimiento, telefono, email, identificacion);
    this.#estadoPago = estadoPago;
  }

  getEstadoPago(){
    return this.#estadoPago;
  }

  setEstadoPago(estadoPago){
    this.#estadoPago = estadoPago;
  }

  convertirAVista(){
    var obj = {
      primerNombre:this.primerNombre,
      segundoNombre:this.segundoNombre,
      primerApellido:this.primerApellido,
      segundoApellido:this.segundoApellido,
      fechaNacimiento:ArreglaFechas.fechaAString(this.fechaNacimiento),
      telefono:this.telefono,
      email:this.email,
      identificacion:this.identificacion
    }
    return obj;
  }

}

module.exports = Cliente;