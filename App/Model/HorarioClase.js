class HorarioClase{
  #id = null;
  #idJornada = null;
  #dia = null;
  #horario = null;
  #matriculas = null;
  
  constructor(id, idJornada, dia, horario, matriculas){
    this.#id = id;
    this.#idJornada = idJornada
    this.#dia = dia;
    this.#horario = horario;
    this.#matriculas = matriculas;
  }

  getId(){
    return this.#id;
  }

  setId(id){
    this.#id = id;
  }

  getIdJornada(){
    return this.#idJornada;
  }

  setIdJornada(idJornada){
    this.#idJornada = idJornada;
  }

  getDia(){
    return this.#dia;
  }

  setDia(dia){
    this.#dia = dia;
  }

  getHorario(){
    return this.#horario;
  }

  setHorario(horario){
    this.#horario = horario;
  }

  getMatriculas(){
    return this.#matriculas;
  }

  setMatriculas(matriculas){
    this.#matriculas = matriculas;
  }

  convertirAVista(){
    var obj = {
      id: this.#id,
      idJornada: this.#idJornada,
      dia:this.#dia,
      horario:this.#horario.convertirAVista(),
    }
    var a = [];
    if(Array.isArray(this.#matriculas)){
      for(let m of this.#matriculas){
        a.push(m.convertirAVista());
      }
    }
    obj.matriculas = a;
    return obj;
  }
}

module.exports = HorarioClase;