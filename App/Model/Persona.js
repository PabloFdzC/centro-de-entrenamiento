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

  nombreCompleto(){
    return this.primerNombre + ' ' + this.segundoNombre + ' ' + this.primerApellido + ' ' + this.segundoApellido;
  }

  getPrimerNombre(){
    return this.primerNombre;
  }
  getSegundoNombre(){
    return this.segundoNombre;
  }
  getPrimerApellido(){
    return this.primerApellido;
  }
  getSegundoApellido(){
    return this.segundoApellido;
  }
  getfechaNacimiento(){
    return this.fechaNacimiento;
  }
  getEdad(){
    return 24;
  }
  getTelefono(){
    return this.telefono;
  }
  getEmail(){
    return this.email;
  }
  getIdentificacion(){
    return this.identificacion;
  }

  setPrimerNombre(primerNombre){
    this.primerNombre = primerNombre;
  }
  setSegundoNombre(segundoNombre){
    this.segundoNombre =segundoNombre;
  }
  setPrimerApellido(primerApellido){
    this.primerApellido=primerApellido;
  }
  setSegundoApellido(segundoApellido){
    this.segundoApellido=segundoApellido;
  }
  setfechaNacimiento(fechaNacimiento){
    this.fechaNacimiento=fechaNacimiento;
  }
  setTelefono(telefono){
    this.telefono=telefono;
  }
  setEmail(email){
    this.email=email;
  }
  setIdentificacion(identificacion){
    this.identificacion=identificacion;
  }

}

module.exports = Persona;