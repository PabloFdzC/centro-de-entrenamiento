const connection = require("./ConexionBaseDatos.js");
const Clase = require("./../Model/Clase.js");
const EstadoPago = require("./../Model/EstadoPago.js");
const { PENDIENTE, MOROSO } = require("./../Model/EstadoPago.js");
const Pago = require("./../Model/Pago.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerPago{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearPago(?,?,?,?)',[elem.cantidad, elem.emailCliente, elem.idClase, EstadoPago[PENDIENTE]], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  consultar(elem){

  }

  modificar(elem){

  }

  eliminar(elem){
    
  }

  async mostrarPendientes(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetPagosPendientes(?,?)',[elem.email, EstadoPago[PENDIENTE]], function(error, result){
        if(error){
          reject(error);
        }else{
          pagoslistaresult = result[0];
          var i;
          var listaPagos = [];
          for(i = 0; i < pagoslistaresult.length; i++){
            pagoresult = pagoslistaresult[i];
            servicio = new Servicio(pagoresult.nombre_servicio, pagoresult.costo_matricula);
            clase = new Clase(id = pagoresult.id_clase, servicio = servicio);
            pago = new Pago(pagoresult.id_pago, pagoresult.fecha, pagoresult.forma_pago, clase);
            listaPagos.push(pago);
          }
          resolve(listaPagos);
        }
      });
    });
  }

  async realizarPago(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL RealizarPago(?,?,?)',[elem.id, elem.formaPago, EstadoPago[ACTIVO]], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async pagoMoroso(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL PagoMoroso(?,?)',[elem.id, EstadoPago[MOROSO]], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ControllerPago;