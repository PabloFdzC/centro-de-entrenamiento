const { Router} = require('express');
const navigation = Router({caseSensitive:true});

const path = {root: 'View/'};


navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/Calendario/:tipo', function (req, res) {
  res.render('Calendario.ejs', {tipo: req.params.tipo});
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

navigation.get('/NuevoAdministrador', function (req, res) {
  res.render('NuevoAdministrador.ejs');
});

navigation.get('/Perfil/:tipo', function (req, res) {
  res.render('Perfil.ejs', {tipo: req.params.tipo});
});



module.exports = navigation;