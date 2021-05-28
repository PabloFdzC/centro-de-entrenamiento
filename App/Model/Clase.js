class Clase {
  
  #capacidad;
  #estado;
  #horarioClase;
  #instructorTemporal;
  #servicio;
  #instructor;
  #clientes;

  constructor(capacidad, estado, horarioClase, instructorTemporal, servicio,
    instructor, clientes){
    this.#capacidad = capacidad;
    this.#estado = estado;
    this.#horarioClase = horarioClase;
    this.#instructorTemporal = instructorTemporal;
    this.#servicio = servicio;
    this.#instructor = instructor;
    this.#clientes = clientes;
  }

  getCapacidad(){
    return this.#capacidad;
  }

  setCapacidad(capacidad){
    this.#capacidad = capacidad;
  }

  getEstado(){
    return this.#estado;
  }

  setEstado(estado){
    this.#estado = estado;
  }

  getHorarioClase(){
    return this.#horarioClase;
  }

  setHorarioClase(horarioClase){
    this.#horarioClase = horarioClase;
  }

  getInstructorTemporal(){
    return this.#instructorTemporal;
  }

  setInstructorTemporal(instructorTemporal){
    this.#instructorTemporal = instructorTemporal;
  }

  getServicio(){
    return this.#servicio;
  }

  setServicio(servicio){
    this.#servicio = servicio;
  }

  getInstructor(){
    return this.#instructor;
  }

  setInstructor(instructor){
    this.#instructor = instructor;
  }

  getClientes(){
    return this.#clientes;
  }

  setClientes(clientes){
    this.#clientes = clientes;
  }
  
}

module.exports = Clase;