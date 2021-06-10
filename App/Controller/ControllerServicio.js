const connection = require("./connection.js");
Servicio = require("./../Model/Servicio.js");

class ControllerServicio{
  
  constructor(){}

  agregar(elem){
    var res;
    connection.query('CALL CrearServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
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
    var res;
    connection.query('CALL ModificarServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
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

  eliminar(elem){
    var res;
    connection.query('CALL EliminarServicio(?)',[elem.id], function(error, result){
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

  listadoServicios(){
    var res;
    connection.query('CALL GetServicios()',[], function(error, result){
      if(error){
        console.log("error: ", error);
        res = {"error_message": error.message};
      }else{
        listaserviciosresult = result[0];
        var i;
        var listaServicios = [];
        for(i = 0; i < listaserviciosresult.length; i++){
          servicioresult = listaserviciosresult[i];
          servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
          listaServicios.push(servicio);
        }
        console.log({listaServicios});
        res = listaServicios;
      }
    });
    return res;
  }

}

module.exports = ControllerServicio;