const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();
const EstadoPago = require("./../Model/EstadoPago.js");

class ConexionPago{
  
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

  async mostrarPendientes(email){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetPagosPendientes(?,?)',[email, EstadoPago[PENDIENTE]], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
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

module.exports = ConexionPago;