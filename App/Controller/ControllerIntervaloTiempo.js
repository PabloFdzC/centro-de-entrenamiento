const IntervaloTiempo = require("../Model/IntervaloTiempo.js");
const TransaccionIntervaloTiempo = require("./TransaccionIntervaloTiempo.js");

class ControllerIntervaloTiempo{
  #transaccionIntervaloTiempo = null;
  
  constructor(){
    this.#transaccionIntervaloTiempo = new TransaccionIntervaloTiempo();
  }

  async agregar(elem){
    let r = await this.#transaccionIntervaloTiempo.agregar(elem);
    return r[0][0].id_intervalo;
  }

  async agregarMultiples(elem){
    let valores = [];
    for(let i = 0; i < elem.length; i++){
      let valor = [elem[i].horaInicio, elem[i].horaFinal, elem[i].minutoInicio, elem[i].minutoFinal];
      valores.push(valor);
    }
    let r = await this.#transaccionIntervaloTiempo.agregarMultiples(valores);
    return r;
  }

  async eliminarMultiples(elem){
    let valores = [];
    for(let i = 0; i < elem.length; i++){
      let valor = [elem[i].idIntervaloTiempo];
      valores.push(valor);
    }
    let r = await this.#transaccionIntervaloTiempo.eliminarMultiples(valores);
    return r;
  }

  async mostrarIntervaloXIdClase(idClase){
    let valores = [];
    let intervalos = await this.#transaccionIntervaloTiempo.mostrarIntervaloXIdClase(idClase);
    for(let i of intervalos){
      valores.push(new IntervaloTiempo(
        i.id_intervalo,
        i.hora_inicio,
        i.minuto_inicio,
        i.hora_final,
        i.minuto_final
      ));
    }
    return valores;
  }

  listaIntervalosObj(elem, cantidad){
    var intervalos = [];
    for(let i = 0; i < cantidad; i++){
      intervalos.push(elem);
    }
    return intervalos;
  }

}

module.exports = ControllerIntervaloTiempo;