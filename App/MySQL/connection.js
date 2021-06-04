var express = require('express');
var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'project1'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

module.exports = connection;