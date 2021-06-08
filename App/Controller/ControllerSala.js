const connection = require("connection.js");
const Clase = require("../Model/Clase.js");
const Sala = require("../Model/Sala.js");
import * as funcionesComunes from 'FuncionesComunes.js'

Sala = require("../Model/Sala.js");
Clase = require("../Model/Clase.js");

class ControllerSala{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL CrearSala(?,?,?)',[elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
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
    connection.query('CALL SelectSala(?)',[elem.id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        salaresult = result[0][0];
        console.log({salaresult});
        listaJornadas = funcionesComunes.jornadasDeSala(salaresult.id_sala);
        listaServicios = funcionesComunes.serviciosDeSala(salaresult.id_sala);
        sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
        console.log({sala});
        res.render('Sala.ejs', {sala});
      }
    });
  }

  modificar(elem, res){
    connection.query('CALL editarSala(?,?,?,?)',[elem.idSala, elem.costoMatricula, elem.capacidad, elem.aforo], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  eliminar(elem, res){
    
  }

  crearCalendario(elem, res){
    var dia = new Date(elem.dia);
    var horaInicio = elem.horaInicio;
    var horaFinal = elem.horaFinal;
    var repeticion = elem.repeticion;
    var dias = [];
    connection.query('CALL CrearIntervaloTiempo(?,?,?,?)',[horaInicio, horaFinal, 0, 0], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        mes = dia.getMonth();
        dias.push(dia);
        var nuevoDia;
        if(repeticion == "cadaSemana"){
          var mismoMes = true;
          var i = 7;
          while(mismoMes){
            nuevoDia = new Date();
            nuevoDia.setMonth(dia.getMonth());
            nuevoDia.setFullYear(dia.getFullYear());
            nuevoDia.setDate(dia.getDate() + i);
            if(nuevoDia.getMonth() == mes){
              dias.push(nuevoDia);
            }
            else{
              mismoMes = false;
            }
            i += 7;
          }
        }
        else if(repeticion == "todosLosDias"){
          var mismoMes = true;
          var i = 1;
          while(mismoMes){
            nuevoDia = new Date();
            nuevoDia.setMonth(dia.getMonth());
            nuevoDia.setFullYear(dia.getFullYear());
            nuevoDia.setDate(i);
            if(nuevoDia.getMonth() == mes){
              dias.push(nuevoDia);
            }
            else{
              mismoMes = false;
            }
            i += 1;
          }
        }
        var j;        
        for(j = 0; j < dias.length; j++){
          connection.query('CALL CrearJornadaCalendario(?,?)',[dia[j], elem.idSala], function(error, result){
            if(error){
              console.log("error: ", error);
              res.send([[{"error_message": error.message}]]);
            }else{
              console.log( "exito: ", result);
            }
          });
        }
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  modificarCalendario(elem, res){
    
  }

}

module.exports = ControllerSala;