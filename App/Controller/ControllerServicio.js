const connection = require("connection.js");
Servicio = require("../Model/Servicio.js");

class ControllerServicio{
  
  constructor(){}

  agregar(elem, res){
    connection.query('CALL CrearServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
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
    connection.query('CALL ModificarServicio(?,?)',[elem.nombreServicio, elem.costoMatricula], function(error, result){
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
    connection.query('CALL EliminarServicio(?)',[elem.id], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
      }else{
        console.log( "exito: ", result);
        res.send(result);
      }
    });
  }

  listadoServicios(res){
    connection.query('CALL GetServicios()',[], function(error, result){
      if(error){
        console.log("error: ", error);
        res.send([[{"error_message": error.message}]]);
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
        res.render('Servicios.ejs', {lista: listaServicios});
      }
    });
  }

}

module.exports = ControllerServicio;