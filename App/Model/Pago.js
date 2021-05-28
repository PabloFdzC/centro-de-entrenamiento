const FormaPago = require('FormaPago.js');

class Pago{
  
  #fecha;
  #formaPago;
  #clase;

  constructor(fecha, formaPago, clase){
    this.#fecha = fecha;
    this.#formaPago = formaPago;
    this.#clase = clase;
  }

  getFecha(){
    return this.#fecha;
  }

  setFecha(fecha){
    this.#fecha = fecha;
  }

  getFormaPago(){
    return this.#formaPago;
  }

  setFormaPago(formaPago){
    this.#formaPago = formaPago;
  }

  getClase(){
    return this.#clase;
  }

  setClase(clase){
    this.#clase = clase;
  }

}

module.exports = Pago;