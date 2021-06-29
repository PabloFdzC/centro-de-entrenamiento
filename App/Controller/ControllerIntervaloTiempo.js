const IntervaloTiempo = require("../Model/IntervaloTiempo.js");
const ArreglaFechas = require("./ArreglaFechas.js");
const TransaccionIntervaloTiempo = require("./TransaccionIntervaloTiempo.js");

class ControllerIntervaloTiempo{
  #transaccionIntervaloTiempo = null;
  #intervalosTiempo = null;
  
  constructor(){
    this.#transaccionIntervaloTiempo = new TransaccionIntervaloTiempo();
    this.#intervalosTiempo = {};
  }

  async agregar(elem){
    let r = await this.#transaccionIntervaloTiempo.agregar(elem);
    return r;
  }

  async modificar(elem){
    let r = await this.#transaccionIntervaloTiempo.modificar(elem);
    return r;
  }

  async agregarMultiples(elem){
    let valores = [];
    for(let i = 0; i < elem.length; i++){
      let valor = [elem[i].horaInicio, elem[i].horaFinal, elem[i].minutoInicio, elem[i].minutoFinal];
      valores.push(valor);
    }
    if(valores.length > 0){
      let r = await this.#transaccionIntervaloTiempo.agregarMultiples(valores);
      return r;
    }
    return null;
  }

  async eliminarMultiples(elem){
    let valores = [];
    for(let i = 0; i < elem.length; i++){
      let valor = [elem[i].idIntervaloTiempo];
      valores.push(valor);
    }
    if(valores.length > 0){
      let r = await this.#transaccionIntervaloTiempo.eliminarMultiples(valores);
      return r;
    }
    return null;
  }

  listaIntervalosObj(elem, cantidad){
    var intervalos = [];
    for(let i = 0; i < cantidad; i++){
      intervalos.push(elem);
    }
    return intervalos;
  }

  agregaMemoria(elem = {id:null,horaInicio:null,minutoInicio:null,horaFinal:null,minutoFinal:null,dia:null}){
    if(!(elem.id in this.#intervalosTiempo)){
      this.#intervalosTiempo[elem.id] = new IntervaloTiempo(
        elem.id,
        elem.horaInicio,
        elem.minutoInicio,
        elem.horaFinal,
        elem.minutoFinal,
        elem.dia);
    } else {
      let it = this.#intervalosTiempo[elem.id];
      if(elem.horaInicio != null && it.getHoraInicio() != elem.horaInicio){
        it.setHoraInicio(elem.horaInicio);
      }
      if(elem.minutoInicio != null && it.getMinutoInicio() != elem.minutoInicio){
        it.setMinutoInicio(elem.minutoInicio);
      }
      if(elem.horaFinal != null && it.getHoraFinal() != elem.horaFinal){
        it.setHoraFinal(elem.horaFinal);
      }
      if(elem.minutoFinal != null && it.getMinutoFinal() != elem.minutoFinal){
        it.setMinutoFinal(elem.minutoFinal);
      }
      if(elem.dia != null && it.getDia() != elem.dia){
        it.setDia(elem.dia);
      }
    }
    return this.#intervalosTiempo[elem.id];
  }

}

module.exports = ControllerIntervaloTiempo;