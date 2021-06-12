const EstadoPago = require('./EstadoPago.js');
Persona = require('./Persona.js');

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

  convertirAJSONString(){
    var obj = {
      primerNombre:this.primerNombre,
      segundoNombre:this.segundoNombre,
      primerApellido:this.primerApellido,
      segundoApellido:this.segundoApellido,
      fechaNacimiento:this.fechaNacimiento,
      telefono:this.telefono,
      email:this.email,
      identificacion:this.identificacion
    }
    return JSON.stringify(obj);
  }

}

module.exports = Cliente;