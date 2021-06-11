const connection = require("./ConexionBaseDatos.js");
Servicio = require("./../Model/Servicio.js");

class ControllerServicio{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
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

  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL ModificarServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async eliminar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL EliminarServicio(?)',[elem.id], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async listadoServicios(){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetServicios()',[], function(error, result){
        if(error){
          reject(error);
        }else{
          var listaserviciosresult = result[0];
          var i;
          var listaServicios = [];
          for(i = 0; i < listaserviciosresult.length; i++){
            var servicioresult = listaserviciosresult[i];
            var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
            listaServicios.push(servicio);
          }
          resolve(listaServicios);
        }
      });
    });
  }

}

module.exports = ControllerServicio;