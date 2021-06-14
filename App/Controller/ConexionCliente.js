const conexionSng = require("./ConexionBaseDatosSng.js");
const connection = conexionSng.getConexionBaseDatos();

class ConexionCliente{
  
  constructor(){}

  async agregar(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL RegistroCliente(?,?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  consultar(email){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetCliente(?)',[email], async function(error, result){
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
      connection.query('CALL modificarCliente(?,?,?,?,?,?,?,?)',[elem.email, elem.identificacion, elem.primerNombre, elem.segundoNombre, elem.primerApellido, elem.segundoApellido, elem.fechaNacimiento, elem.contrasenna, elem.telefono], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  mostrarClientes(){
    return new Promise(function(resolve, reject){
      connection.query('CALL GetClientes()',[], async function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

  async modificarContrasenna(elem){
    return new Promise(function(resolve, reject){
      connection.query('CALL modificarContrasennaCliente(?,?)',[elem.email, elem.contrasenna], function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }

}

module.exports = ConexionCliente;