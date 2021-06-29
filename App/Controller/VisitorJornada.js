const ClaseEditable = require("./ClaseEditable.js");
const ClaseSoloLectura = require("./ClaseSoloLectura.js");
const ClaseMatricula = require("./ClaseMatricula");
const EstadoClase = require("./../Model/EstadoClase.js");

class VisitorJornada{
  #clases = [];
  #tipoUsuario = null;
  #email = null;
  #dia = null;
  #idJornada = null;

  visit(j){
    this.#clases = j.getClases();
    this.#dia = j.getDia();
    this.#idJornada = j.getId();
  }

  getClases(){
    var clases = {};
    var hoy = new Date();
    var pasada = false;
    if(hoy.getTime() > this.#dia.getTime()){
      pasada = true;
    }
    for(let c in this.#clases){
      let hc = this.#clases[c].getHorarioDeJornada(this.#idJornada);
      if(hc == null){
        continue;
      }
      if(this.#tipoUsuario === "Administrador" && !pasada){
        if(hc.getMatriculas().length === 0){
          clases[c] = new ClaseEditable(this.#clases[c]);
        } else {
          clases[c] = new ClaseSoloLectura(this.#clases[c]);
        }
      } else if(this.#tipoUsuario === "Instructor" && !pasada){
        if(this.#clases[c].getInstructor().getEmail() === this.#email &&
        hc.getMatriculas().length === 0){
          clases[c] = new ClaseEditable(this.#clases[c]);
        } else {
          clases[c] = new ClaseSoloLectura(this.#clases[c]);
        }
      } else if(this.#tipoUsuario === "Cliente"){
        if(this.#clases[c].getEstado() === EstadoClase.PUBLICADA){
          if(!pasada || this.#clases[c].getCapacidad() > hc.getMatriculas().length){
            clases[c] = new ClaseMatricula(this.#clases[c]);
          } else {
            clases[c] = new ClaseSoloLectura(this.#clases[c]);  
          }
        }
      } else {
        clases[c] = new ClaseSoloLectura(this.#clases[c]);
      }
    }
    
    return clases;
  }

  setTipoUsuario(tipoUsuario){
    this.#tipoUsuario = tipoUsuario;
  }

  setEmail(email){
    this.#email = email;
  }

}

module.exports = VisitorJornada;