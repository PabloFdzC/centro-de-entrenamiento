const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionPago = ConexionSng.getConexionPago();
const Clase = require("./../Model/Clase.js");
const EstadoPago = require("./../Model/EstadoPago.js");
const { PENDIENTE, MOROSO } = require("./../Model/EstadoPago.js");
const Pago = require("./../Model/Pago.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerPago{
  
  constructor(){}

  async agregar(elem){
    try{
      var result = await ConexionPago.agregar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  consultar(elem){

  }

  modificar(elem){

  }

  eliminar(elem){
    
  }

  async mostrarPendientes(email){
    try{
      var result = await ConexionPago.mostrarPendientes(email);
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
    }catch(err){
      throw err;
    }
  }

  async realizarPago(elem){
    try{
      var result = await ConexionPago.realizarPago(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  async pagoMoroso(elem){
    try{
      var result = await ConexionPago.pagoMoroso(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerPago;