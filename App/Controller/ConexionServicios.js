const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionServicios{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL CrearServicio(?,?)',[elem.nombre, elem.costo], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }
  
  async modificar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL ModificarServicio(?,?)',[elem.nombre, elem.costo], function(error, result){
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
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionServicios;