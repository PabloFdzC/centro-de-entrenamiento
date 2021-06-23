class IntervaloTiempo {
  #id = null;
  #horaInicio = null;
  #minutoInicio = null;
  #horaFinal = null;
  #minutoFinal = null;

  constructor(id,horaInicio, minutoInicio, horaFinal, minutoFinal){
    this.#id = id;
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
    if(this.getHoraInicio() < 10){
      hi = "0"+this.getHoraInicio();
    } else {
      if(this.getHoraInicio() > 12){
        hi += this.getHoraInicio() - 12;
      } else {
        hi += this.getHoraInicio();
      }
    }
    if(this.getHoraInicio() > 12){
      return hi+":"+mi+"pm";
    } else if(this.getHoraInicio() == 12){
      return hi+":"+mi+"md";
    } else {
      return hi+":"+mi+"am";
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
    if(this.getHoraFinal() < 10){
      hi = "0"+this.getHoraFinal();
    } else {
      if(this.getHoraFinal() > 12){
        hi += this.getHoraFinal() - 12;
      } else {
        hi += this.getHoraFinal();
      }
    }
    if(this.getHoraFinal() > 12){
      return hi+":"+mi+"pm";
    } else if(this.getHoraFinal() == 12){
      return hi+":"+mi+"md";
    } else {
      return hi+":"+mi+"am";
    }
  }

  convertirAVista(){
    var obj = {
      id:this.#id,
      horaInicio:this.#horaInicio,
      minutoInicio:this.#minutoInicio,
      horaFinal:this.#horaFinal,
      minutoFinal:this.#minutoFinal,
      horaMinutosInicio:this.getHoraMinutosInicio(),
      horaMinutosFinal:this.getHoraMinutosFinal()
    }
    return obj;
  }
  
}

module.exports = IntervaloTiempo;