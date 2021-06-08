const connection = require("connection.js");
const Clase = require("../Model/Clase.js");
const EstadoPago = require("../Model/EstadoPago.js");
const { PENDIENTE, MOROSO } = require("../Model/EstadoPago.js");
const Instructor = require("../Model/Instructor.js");
const IntervaloTiempo = require("../Model/IntervaloTiempo.js");
const Pago = require("../Model/Pago.js");
const Servicio = require("../Model/Servicio.js");
import * as funcionesComunes from 'FuncionesComunes.js'

Pago = require("../Model/Pago.js");
EstadoPago = require("../Model/EstadoPago.js");

class ControllerPago{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL CrearPago(?,?,?,?)',[elem.cantidad, elem.emailCliente, elem.idClase, EstadoPago[PENDIENTE]], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  consultar(elem, res){

  }

  modificar(elem, res){

  }

  eliminar(elem, res){
    
  }

  mostraPendientes(elem, res){
    connection.query('CALL GetPagosPendientes(?,?)',[elem.email, EstadoPago[PENDIENTE]], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        pagoslistaresult = result[0];
        var i;
        var listaPagos = [];
        for(i = 0; i < pagoslistaresult.length; i++){
          pagoresult = pagoslistaresult[i];
          listaServiciosInstructor = funcionesComunes.serviciosDeInstructor(pagoresult.email);
          instructor = new Instructor(pagoresult.primer_nombre, pagoresult.segundo_nombre, pagoresult.primer_apellido, pagoresult.segundo_apellido, pagoresult.fecha_nacimiento, pagoresult.telefono, pagoresult.email, pagoresult.identificacion, listaServiciosInstructor);
          instructor_temporal = pagoresult.email_instructor_temporal;
          if(instructor_temporal){
            instructor_temporal = funcionesComunes.getInstructor(pagoresult.email_instructor_temporal);
          }
          servicio = new Servicio(pagoresult.nombre_servicio, pagoresult.costo_matricula);
          intervalo = new IntervaloTiempo(pagoresult.hora_inicio, pagoresult.minuto_inicio, pagoresult.hora_final, pagoresult.minuto_final);
          clase = new Clase(pagoresult.id_clase, pagoresult.capacidad, pagoresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, []);
          pago = new Pago(pagoresult.id_pago, pagoresult.fecha, pagoresult.forma_pago, clase);
          listaPagos.push(pago);
        }
        console.log({listaPagos});
        res.render('Pagos.ejs', {lista: listaPagos});
      }
    });
  }

  realizarPago(elem, res){
    connection.query('CALL RealizarPago(?,?,?)',[elem.id, elem.formaPago, EstadoPago[ACTIVO]], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  pagoMoroso(elem, res){
    connection.query('CALL PagoMoroso(?,?)',[elem.id, EstadoPago[MOROSO]], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

}

module.exports = ControllerPago;