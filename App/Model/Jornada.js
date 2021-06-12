class Jornada {
  
  #id
  #dia;
  #horarioAtencion;
  #clases;

  constructor(id, dia, horarioAtencion, clases){
    this.#id = id;
    this.#dia = new Date(dia);
    this.#horarioAtencion = horarioAtencion;
    this.#clases = clases;
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

}

module.exports = Jornada;