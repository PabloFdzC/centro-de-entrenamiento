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

  getHoraMinutosInicio(){
    let mi = ""
    let hi = ""
    if(this.getMinutoInicio() < 10){
      mi = "0"+this.getMinutoInicio();
    } else {
      mi += this.getMinutoInicio();
    }
    if(this.getMinutoInicio() < 10){
      hi = "0"+this.getHoraInicio();
    } else {
      hi += this.getHoraInicio();
    }
  }

  getHoraMinutosFinal(){
    let mi = ""
    let hi = ""
    if(this.getMinutoFinal() < 10){
      mi = "0"+this.getMinutoFinal();
    } else {
      mi += this.getMinutoFinal();
    }
    if(this.getMinutoFinal() < 10){
      hi = "0"+this.getHoraFinal();
    } else {
      hi += this.getHoraFinal();
    }
  }
  
}

module.exports = IntervaloTiempo;