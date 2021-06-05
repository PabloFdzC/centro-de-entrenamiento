const { Router} = require('express');
const navigation = Router();

const path = {root: 'View/'};


navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/Calendario', function (req, res) {
  res.render('Calendario.ejs');
});

navigation.get('/Instructores', function (req, res) {
  res.render('Instructores.ejs');
});

navigation.get('/Clientes', function (req, res) {
  res.render('Clientes.ejs');
});

navigation.get('/Servicios', function (req, res) {
  res.render('Servicios.ejs');
});

navigation.get('/Sala', function (req, res) {
  res.render('Sala.ejs');
});

navigation.get('/Pagos', function (req, res) {
  res.render('Pagos.ejs');
});

module.exports = navigation;