class Sala {
  
  #id
  #capacidad;
  #aforo;
  #costoMatricula;
  #calendario;
  #servicios;

  constructor(id, capacidad, aforo, costoMatricula, calendario, servicios){
    this.#id = id;
    this.#capacidad = capacidad;
    this.#aforo = aforo;
    this.#costoMatricula = costoMatricula;
    this.#calendario = calendario;
    this.#servicios = servicios;
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

  getAforo(){
    return this.#aforo;
  }

  setAforo(aforo){
    this.#aforo = aforo;
  }

  getCostoMatricula(){
    return this.#costoMatricula;
  }

  setCostoMatricula(costoMatricula){
    this.#costoMatricula = costoMatricula;
  }

  getCalendario(){
    return this.#calendario;
  }

  setCalendario(calendario){
    this.#calendario = calendario;
  }

  getServicios(){
    return this.#servicios;
  }

  setServicios(servicios){
    this.#servicios = servicios;
  }

  calcularCapacidad(){
    return parseInt(this.#capacidad * this.#aforo, 10);
  }

  convertirAVista(){
    var obj = {
      id:this.#id,
      capacidad:this.#capacidad,
      aforo:this.#aforo,
      costoMatricula:this.#costoMatricula
    }
    var a = [];
    var a2 = [];
    if(Array.isArray(this.#servicios)){
      for(let s of this.#servicios){
        a.push(s.getNombre());
      }
    }
    if(Array.isArray(this.#calendario)){
      for(let c of this.#calendario){
        a.push(c.convertirAVista());
      }
    }
    obj.servicios = a;
    return obj;
  }

  calendarioPorDias(){
    var r = {0:[],1:[],2:[],3:[],4:[],5:[],6:[]};
    if(Array.isArray(this.#calendario)){
      for(let c of this.#calendario){
        let i = c.getDia().getDay();
        r[i].push(c);
      }
    }
    return r;
  }
  
}

module.exports = Sala;