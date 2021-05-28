const EstadoPago = require('EstadoPago.js');
Persona = require('Persona.js');

class Cliente extends Persona{
  
  #estadoPago;

  constructor(primerNombre, segundoNombre, primerApellido, segundoApellido,
    fechaNacimiento, telefono, email, identificacion){
    super(primerNombre, segundoNombre, primerApellido, segundoApellido,
      fechaNacimiento, telefono, email, identificacion);
    this.#estadoPago = EstadoPago.MOROSO;
  }

  getEstadoPago(){
    return this.#estadoPago;
  }

  setEstadoPago(estadoPago){
    this.#estadoPago = estadoPago;
  }

}

module.exports = Cliente;