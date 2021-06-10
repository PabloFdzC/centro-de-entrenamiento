const connection = require("./connection.js");
const Clase = require("./../Model/Clase.js");
const EstadoPago = require("./../Model/EstadoPago.js");
const { PENDIENTE, MOROSO } = require("./../Model/EstadoPago.js");
const Pago = require("./../Model/Pago.js");
const Servicio = require("./../Model/Servicio.js");

class ControllerPago{
  
  constructor(){}

  agregar(elem){
    var res;
    connection.query('CALL CrearPago(?,?,?,?)',[elem.cantidad, elem.emailCliente, elem.idClase, EstadoPago[PENDIENTE]], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

  consultar(elem){

  }

  modificar(elem){

  }

  eliminar(elem){
    
  }

  mostrarPendientes(elem){
    var res;
    connection.query('CALL GetPagosPendientes(?,?)',[elem.email, EstadoPago[PENDIENTE]], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        pagoslistaresult = result[0];
        var i;
        var listaPagos = [];
        for(i = 0; i < pagoslistaresult.length; i++){
          pagoresult = pagoslistaresult[i];
          servicio = new Servicio(pagoresult.nombre_servicio, pagoresult.costo_matricula);
          clase = new Clase(pagoresult.id_clase, servicio);
          pago = new Pago(pagoresult.id_pago, pagoresult.fecha, pagoresult.forma_pago, clase);
          listaPagos.push(pago);
        }
        console.log({listaPagos});
        res = listaPagos;
      }
    });
    return res;
  }

  realizarPago(elem){
    var res;
    connection.query('CALL RealizarPago(?,?,?)',[elem.id, elem.formaPago, EstadoPago[ACTIVO]], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

  pagoMoroso(elem){
    var res;
    connection.query('CALL PagoMoroso(?,?)',[elem.id, EstadoPago[MOROSO]], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        console.log( "exito: ", result);
        res = result;
      }
    });
    return res;
  }

}

module.exports = ControllerPago;