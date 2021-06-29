const FormaPago = require('./FormaPago.js');

class Pago{
  
  #id = null;
  #fecha = null;
  #formaPago = null;
  #cantidad = null;
  #clase = null;

  constructor(id, fecha, formaPago, cantidad, clase){
    this.#id = id;
    this.#fecha = fecha;
    this.#formaPago = formaPago;
    this.#cantidad = cantidad;
    this.#clase = clase;
  }

  getId(){
    return this.#id;
  }

  setId(id){
    this.#id = id;
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

  getCantidad(){
    return this.#cantidad;
  }

  setCantidad(cantidad){
    this.#cantidad = cantidad;
  }

  getClase(){
    return this.#clase;
  }

  setClase(clase){
    this.#clase = clase;
  }

  convertirAVista(){
    var obj = {
      id: this.#id,
      fecha: this.#fecha,
      formaPago:this.#formaPago,
      cantidad:this.#cantidad,
      clase:this.#clase.convertirAVista()
    }
    return obj;
  }

}

module.exports = Pago;