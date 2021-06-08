class IntervaloTiempo {
  
  #horaInicio;
  #minutoInicio;
  #horaFinal;
  #minutoFinal;

  constructor(horaInicio, minutoInicio, horaFinal, minutoFinal){
    this.#horaInicio = horaInicio;
    this.#minutoInicio = minutoInicio;
    this.#horaFinal = horaFinal;
    this.#minutoFinal = minutoFinal;
  }

  getHoraInicio(){
    return this.#horaInicio;
  }

  setHoraInicio(horaInicio){
    this.#horaInicio = horaInicio;
  }

  getMinutoInicio(){
    return this.#minutoInicio;
  }

  setMinutoInicio(minutoInicio){
    this.#minutoInicio = minutoInicio;
  }

  getHoraFinal(){
    return this.#horaFinal;
  }

  setHoraFinal(horaFinal){
    this.#horaFinal = horaFinal;
  }

  getMinutoFinal(){
    return this.#minutoFinal;
  }

  setMinutoFinal(minutoFinal){
    this.#minutoFinal = minutoFinal;
  }

  calcularHoras(){
    
  }
  
}

module.exports = IntervaloTiempo;