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

  async query(s, params, commit = false){
    var con = this.#conexion;
    return new Promise(function(resolve, reject){
      con.query(s, params, async function(error, result){
        if(error){
          reject(error);
        }else{
          if(commit){
            await con.commit();
          }
          resolve(result);
        }
      });
    });
  }
  
}

module.exports = ConexionBaseDatos;