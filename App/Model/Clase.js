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
  
  convertirAVista(){
    var obj = {
      id: this.#id,
      capacidad: this.#capacidad,
      estado:this.#estado,
      instructorTemporal:null,
      servicio:this.#servicio.getNombre(),
      instructor:this.#instructor.convertirAVista(),
    }
    if(this.#instructorTemporal){
      obj.instructorTemporal = this.#instructorTemporal.convertirAVista()
    }
    var a = [];
    if(Array.isArray(this.#clientes)){
      for(let c of this.#clientes){
        a.push(c.convertirAVista());
      }
    }
    obj.clientes = a;
    var a2 = [];
    if(Array.isArray(this.#horarioClase)){
      for(let hc of this.#horarioClase){
        a2.push(hc.convertirAVista());
      }
    }
    obj.horarioClase = a2;
    return obj;
  }
}

module.exports = Clase;