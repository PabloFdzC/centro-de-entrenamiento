const TransaccionPago = require("./TransaccionPago.js");
const Clase = require("./../Model/Clase.js");
const EstadoPago = require("./../Model/EstadoPago.js");
const Pago = require("./../Model/Pago.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerPago{
  #transaccionPago = null;
  
  constructor(){
    this.#transaccionPago = new TransaccionPago();
  }

  async agregar(elem){
    elem.estado = EstadoPago.PENDIENTE;
    var result = await this.#transaccionPago.agregar(elem);
    return result;
  }

  async modificar(elem){
    var result = await this.#transaccionPago.modificar(elem);
    return result;
  }

  async eliminar(elem){
    var result = await this.#transaccionPago.eliminar(elem);
    return result;
  }

  async mostrarPendientes(email){
    let elem = {email, estado:EstadoPago.PENDIENTE};
    var result = await this.#transaccionPago.mostrarPendientes(elem);
    var pagoslistaresult = result[0];
    var i;
    var listaPagos = [];
    for(i = 0; i < pagoslistaresult.length; i++){
      var pagoresult = pagoslistaresult[i];
      var servicio = new Servicio(pagoresult.nombre_servicio, pagoresult.costo_matricula);
      var clase = new Clase(id = pagoresult.id_clase, servicio = servicio);
      var pago = new Pago(pagoresult.id_pago, pagoresult.fecha, pagoresult.forma_pago, clase);
      listaPagos.push(pago);
    }
    return listaPagos;
  }

  async realizarPago(elem){
    elem.estado = EstadoPago.ACTIVO;
    var result = await this.#transaccionPago.modificar(elem);
    return result;
  }

}

module.exports = ControllerPago;