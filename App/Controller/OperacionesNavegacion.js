const { Router} = require('express');
const navigation = Router({caseSensitive:true});
const ControllersSng = require('./ControllersSng.js');
const ctrlSng = ControllersSng.getInstance();
const ctrlAdm = ctrlSng.getControllerAdministrador();

const path = {root: 'View/'};


navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  req.session.email = null;
  req.session.tipo = null;
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/Calendario', function (req, res) {
  if(req.session.email){
    res.render('Calendario.ejs', {tipo: req.session.tipo});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Instructores', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Instructores.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Clientes', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Clientes.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Servicios', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Servicios.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Sala', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Sala.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Pagos', function (req, res) {
  if(req.session.tipo === 'Cliente'){
    res.render('Pagos.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/NuevoAdministrador', async function (req, res) {
  let t = await ctrlAdm.contar();
  if(t == 0 || req.session.tipo === 'Administrador'){
    res.render('NuevoAdministrador.ejs');
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Perfil', function (req, res) {
  if(req.session.email){
    res.render('Perfil.ejs', {tipo: req.session.tipo});
  } else {
    res.redirect('/IniciarSesion');
  }
});



module.exports = navigation;