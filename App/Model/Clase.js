class Clase {
  
  #id
  #capacidad;
  #estado;
  #horarioClase;
  #instructorTemporal;
  #servicio;
  #instructor;
  #clientes;

  constructor(id, capacidad, estado, horarioClase, instructorTemporal, servicio,
    instructor, clientes){
    this.#id = id;
    this.#capacidad = capacidad;
    this.#estado = estado;
    this.#horarioClase = horarioClase;
    this.#instructorTemporal = instructorTemporal;
    this.#servicio = servicio;
    this.#instructor = instructor;
    this.#clientes = clientes;
  }

  getId(){
    return this.#id;
  }

  setId(id){
    this.#id = id;
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