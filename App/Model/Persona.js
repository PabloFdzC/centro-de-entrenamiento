class Persona{

  primerNombre = null;
  segundoNombre = null;
  primerApellido = null;
  segundoApellido = null;
  fechaNacimiento = null;
  telefono = null;
  email = null;
  identificacion = null;

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

  getNombreCompleto(){
    let nombreCompleto = this.primerNombre + ' ';
    if(this.segundoNombre){
      nombreCompleto += this.segundoNombre + ' ';
    }
    nombreCompleto += this.primerApellido + ' ' +
      this.segundoApellido;
    return nombreCompleto;
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
  getFechaNacimiento(){
    return this.fechaNacimiento;
  }
  getEdad(){
    let hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    let mesDif = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (mesDif < 0 || (mesDif == 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
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