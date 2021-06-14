const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionServicios = ConexionSng.getConexionServicios();
Servicio = require("./../Model/Servicio.js");

class ControllerServicio{
  
  constructor(){}

  async agregar(elem){
    try{
      var result = await ConexionServicios.agregar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  consultar(elem){

  }

  async modificar(elem){
    try{
      var result = await ConexionServicios.modificar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  async eliminar(elem){
    try{
      var result = await ConexionServicios.eliminar(elem);
      return result;
    }catch(err){
      throw err;
    }
  }

  async listadoServicios(){
    try{
      var result = await ConexionServicios.listadoServicios();
      var listaserviciosresult = result[0];
      var i;
      var listaServicios = [];
      for(i = 0; i < listaserviciosresult.length; i++){
        var servicioresult = listaserviciosresult[i];
        var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
        listaServicios.push(servicio);
      }
      return listaServicios;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerServicio;