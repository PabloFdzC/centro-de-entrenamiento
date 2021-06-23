const ArreglaFechas = require("./ArreglaFechas.js");
const TransaccionPago = require("./TransaccionPago.js");
const EstadoPago = require("./../Model/EstadoPago.js");
const Pago = require("./../Model/Pago.js");

class ControllerPago{
  #transaccionPago = null;
  #ctrlServicio = null;
  #ctrlClase = null;

  #pagos = null;
  
  constructor(ctrlServicio, ctrlClase){
    this.#ctrlServicio = ctrlServicio;
    this.#ctrlClase = ctrlClase;
    this.#transaccionPago = new TransaccionPago();
    this.#pagos = {};
  }

  async agregar(elem){
    elem.estado = EstadoPago.PENDIENTE;
    var r = await this.#transaccionPago.agregar(elem);
    return r;
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
      var p = pagoslistaresult[i];
      var servicio = this.#ctrlServicio.agregaMemoria({
        nombre:p.nombre_servicio,
        costoMatricula:p.costo_matricula
      });
      var clase = this.#ctrlClase.agregaMemoria({
        id: p.id_clase,
        servicio
      });
      var pago = this.agregaMemoria({
        id:p.id_pago,
        fecha:p.fecha,
        formaPago:p.forma_pago,
        cantidad:p.cantidad,
        clase
      });
      listaPagos.push(pago);
    }
    return listaPagos;
  }

  async realizarPago(elem){
    elem.estado = EstadoPago.ACTIVO;
    var result = await this.#transaccionPago.modificar(elem);
    return result;
  }

  agregaMemoria(elem = {id:null,fecha:null,formaPago:null,cantidad:null,clase:null}){
    if(!(elem.id in this.#pagos)){
      this.#pagos[elem.id] = new Pago(
        elem.id,
        ArreglaFechas.stringAFecha(elem.fecha),
        elem.formaPago,
        elem.cantidad,
        elem.clase);
    } else {
      let p = this.#pagos[elem.id];
      if(elem.fecha != null && ArreglaFechas.fechaAString(p.getDia()) != elem.fecha){
        p.setFecha(ArreglaFechas.stringAFecha(elem.fecha));
      }
      if(elem.formaPago != null && p.getFormaPago() != elem.formaPago){
        p.setFormaPago(elem.formaPago);
      }
      if(elem.cantidad != null && p.getCantidad() != elem.cantidad){
        p.setCantidad(elem.cantidad);
      }
      if(elem.clase != null && p.getClase() != elem.clase){
        p.setClase(elem.clase);
      }
    }
    return this.#pagos[elem.id];
  }
}

module.exports = ControllerPago;