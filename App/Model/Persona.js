class Persona{

  primerNombre;
  segundoNombre;
  primerApellido;
  segundoApellido;
  fechaNacimiento;
  telefono;
  email;
  identificacion;

  constructor(primerNombre, segundoNombre, primerApellido, segundoApellido,
    fechaNacimiento, telefono, email, identificacion){

    this.primerNombre = primerNombre;
    this.segundoNombre = segundoNombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
    this.email = email;
    this.identificacion = identificacion;

  }

}

module.exports = Persona;