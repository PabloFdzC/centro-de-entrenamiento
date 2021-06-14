const mysql = require('mysql');

class ConexionBaseDatos{
  #parametrosConexion = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sistemaentrenamiento',
    dateStrings: true
  };

  #conexion = null;
  
  constructor(){
    this.#conexion = mysql.createConnection(this.#parametrosConexion);
  
    this.#conexion.connect(function(error){
      if(!!error){
        console.log('Error');
      } else {
        console.log('Connected');
      }
    });
  }

  async query(s, params){
    return new Promise(function(resolve, reject){
      this.#conexion.query(s, params, function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result);
        }
      });
    });
  }
  
}

module.exports = ConexionBaseDatos;