const { Router} = require('express');
const navigation = Router();

const path = {root: 'View/'};


navigation.get('/', function (req, res) {
  res.redirect('/iniciarSesion');
});

navigation.get('/iniciarSesion', function (req, res) {
  res.sendFile('IniciarSesion-Registrarse.html', path);
});

module.exports = navigation;