class Clase {
  
  #id = null;
  #capacidad = null;
  #estado = null;
  #horarios = null;
  #instructorTemporal = null;
  #servicio = null;
  #instructor = null;
  #vistoPorInstructor = null;

  constructor(id, capacidad, estado, horarios, instructorTemporal, servicio,
    instructor, vistoPorInstructor){
    this.#id = id;
    this.#capacidad = capacidad;
    this.#estado = estado;
    this.#horarios = horarios;
    this.#instructorTemporal = instructorTemporal;
    this.#servicio = servicio;
    this.#instructor = instructor;
    this.#vistoPorInstructor = vistoPorInstructor;
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

  getHorarios(){
    return this.#horarios;
  }

  setHorarios(horarios){
    this.#horarios = horarios;
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

  getVistoPorInstructor(){
    return this.#vistoPorInstructor;
  }

  setVistoPorInstructor(vistoPorInstructor){
    this.#vistoPorInstructor = vistoPorInstructor;
  }

  getHorarioDeJornada(idJornada){
    for(let h of this.#horarios){
      if(h.getIdJornada() === idJornada){
        return h;
      }
    }
    return null;
  }
  
  convertirAVista(){
    console.log(this.#instructor);
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
    if(Array.isArray(this.#horarios)){
      for(let h of this.#horarios){
        a.push(h.convertirAVista());
      }
    }
    obj.horarios = a;
    return obj;
  }

  accionDeClase(){
    return AccionClase.VER;
  }
}

module.exports = Clase;