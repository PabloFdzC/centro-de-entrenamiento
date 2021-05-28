class Jornada {
  
  #dia;
  #horarioAtencion;
  #clases;

  constructor(dia, horarioAtencion){
    this.#dia = dia;
    this.#horarioAtencion = horarioAtencion;
    this.#clases = clases;
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

}

module.exports = Jornada;