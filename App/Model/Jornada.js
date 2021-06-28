const ArreglaFechas = require("../Controller/ArreglaFechas");

class Jornada {
  
  #id = null;
  #dia = null;
  #horarioAtencion = null;
  #clases = null;
  #cantidadClases = null;

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
      dia:ArreglaFechas.fechaAString(this.#dia),
      horarioAtencion:this.#horarioAtencion.convertirAVista(),
      cantidadClases:this.#cantidadClases
    }
    return obj;
  }

  aceptar(vj){
    vj.visit(this);
  }

  puedeEditarse(){
    return true;
  }
}

module.exports = Jornada;