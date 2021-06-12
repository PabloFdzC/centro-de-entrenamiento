const mysql = require('mysql');

const parametrosConexion = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sistemaentrenamiento',
    dateStrings: true
};

const connection = mysql.createConnection(parametrosConexion);

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

module.exports = connection;