const ClaseEditable = require("./ClaseEditable.js");
const ClaseSoloLectura = require("./ClaseSoloLectura.js");
const ClaseMatricula = require("./ClaseMatricula");
const EstadoClase = require("./../Model/EstadoClase.js");

class VisitorJornada{
  #clases = [];
  #tipoUsuario = null;
  #email = null;
  #dia = null;

  visit(j){
    this.#clases = j.getClases();
    this.#dia = j.getDia();
  }

  getClases(){
    var clases = {};
    var hoy = new Date();
    var pasada = false;
    if(hoy.getTime() > this.#dia.getTime()){
      pasada = true;
    }
    for(let c in this.#clases){
      if(this.#tipoUsuario === "Administrador" && !pasada){
        if(this.#clases[c].getMatriculas().length === 0){
          clases[c] = new ClaseEditable(this.#clases[c]);
        } else {
          clases[c] = new ClaseSoloLectura(this.#clases[c]);
        }
      } else if(this.#tipoUsuario === "Instructor" && !pasada){
        if(this.#clases[c].getInstructor().getEmail() === this.#email &&
        this.#clases[c].getMatriculas().length === 0){
          clases[c] = new ClaseEditable(this.#clases[c]);
        } else {
          clases[c] = new ClaseSoloLectura(this.#clases[c]);
        }
      } else if(this.#tipoUsuario === "Cliente"){
        if(this.#clases[c].getEstado() === EstadoClase.PUBLICADA){
          if(!pasada){
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