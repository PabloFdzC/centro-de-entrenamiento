class Clase {
  
  #id = null;
  #capacidad = null;
  #estado = null;
  #horario = null;
  #instructorTemporal = null;
  #servicio = null;
  #instructor = null;
  #matriculas = [];
  #vistoPorInstructor = null;

  constructor(id, capacidad, estado, horario, instructorTemporal, servicio,
    instructor, matriculas, vistoPorInstructor){
    this.#id = id;
    this.#capacidad = capacidad;
    this.#estado = estado;
    this.#horario = horario;
    this.#instructorTemporal = instructorTemporal;
    this.#servicio = servicio;
    this.#instructor = instructor;
    this.#matriculas = matriculas;
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

  getHorario(){
    return this.#horario;
  }

  setHorario(horario){
    this.#horario = horario;
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

  getMatriculas(){
    return this.#matriculas;
  }

  setMatriculas(matriculas){
    this.#matriculas = matriculas;
  }

  getVistoPorInstructor(){
    return this.#vistoPorInstructor;
  }

  setVistoPorInstructor(vistoPorInstructor){
    this.#vistoPorInstructor = vistoPorInstructor;
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
    if(Array.isArray(this.#matriculas)){
      for(let c of this.#matriculas){
        a.push(c.convertirAVista());
      }
    }
    obj.matriculas = a;
    var a2 = {};
    if(typeof(this.#horario) === 'object' && this.#horario !== null){
      for(let hc in this.#horario){
        a2[hc] = this.#horario[hc].convertirAVista();
      }
    }
    obj.horario = a2;
    return obj;
  }

  accionDeClase(){
    return AccionClase.VER;
  }
}

module.exports = Clase;