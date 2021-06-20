class Jornada {
  
  #id
  #dia;
  #horarioAtencion;
  #clases;
  #cantidadClases;

  constructor(id, dia, horarioAtencion, clases, cantidadClases){
    this.#id = id;
    this.#dia = dia;
    this.#horarioAtencion = horarioAtencion;
    this.#clases = clases;
    this.#cantidadClases = cantidadClases;
  }

  getId(){
    return this.#id;
  }

  setId(id){
    this.#id = id;
  }

  getDia(){
    return this.#dia;
  }

  setDia(dia){
    this.#dia = dia;
  }

  getHorarioAtencion(){
    return this.#horarioAtencion;
  }

  setHorarioAtencion(horarioAtencion){
    this.#horarioAtencion = horarioAtencion;
  }

  getClases(){
    return this.#clases;
  }

  setClases(clases){
    this.#clases = clases;
  }

  getCantidadClases(){
    return this.#cantidadClases;
  }

  setCantidadClases(cantidadClases){
    this.#cantidadClases = cantidadClases;
  }

  convertirAVista(){
    var obj = {
      id:this.#id,
      dia:this.#dia,
      horarioAtencion:this.#horarioAtencion.convertirAVista(),
      cantidadClases:this.#cantidadClases
    }
    return obj;
  }
}

module.exports = Jornada;