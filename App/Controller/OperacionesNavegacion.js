const { Router} = require('express');
const navigation = Router({caseSensitive:true});
const ControllersSng = require('./ControllersSng.js');
const ctrlSng = ControllersSng.getInstance();
const ctrlAdm = ctrlSng.getControllerAdministrador();
const ctrlInstr = ctrlSng.getControllerInstructor();
const ctrlCliente = ctrlSng.getControllerCliente();

const path = {root: 'View/'};


navigation.get('/*', async function (req, res, next) {
  if(req.session.tipo === "Administrador"){
    var notificacion = await ctrlAdm.hayNotificacion(req.session.email);
    req.session.notificacion = notificacion;
  } else if(req.session.tipo === "Instructor"){
    var notificacion = await ctrlInstr.hayNotificacion(req.session.email);
    req.session.notificacion = notificacion;
  }
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

navigation.get('/', function (req, res) {
  res.redirect('/IniciarSesion');
});

navigation.get('/IniciarSesion', function (req, res) {
  req.session.email = null;
  req.session.tipo = null;
  req.session.notificacion = null;
  res.render('IniciarSesion-Registrarse.ejs');
});

navigation.get('/Calendario', function (req, res) {
  if(req.session.email){
    res.render('Calendario.ejs', {
      tipo: req.session.tipo,
      notificacion: req.session.notificacion
    });
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Instructores', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Instructores.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Clientes', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Clientes.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Servicios', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Servicios.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Sala', function (req, res) {
  if(req.session.tipo === 'Administrador'){
    res.render('Sala.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Pagos', function (req, res) {
  if(req.session.tipo === 'Cliente'){
    res.render('Pagos.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/NuevoAdministrador', async function (req, res) {
  let t = await ctrlAdm.contar();
  if(t == 0 || req.session.tipo === 'Administrador'){
    res.render('NuevoAdministrador.ejs', {notificacion: req.session.notificacion});
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Perfil', async function (req, res) {
  if(req.session.email){
    var u;
    if(req.session.tipo === 'Instructor'){
      u = await ctrlInstr.consultar(req.session.email);
    } else if(req.session.tipo === 'Cliente'){
      u = await ctrlCliente.consultar(req.session.email);
    } else if(req.session.tipo === 'Administrador'){
      u = {email:req.session.email};
    }
    res.render('Perfil.ejs', {
      tipo: req.session.tipo,
      usuario:u,
      notificacion: req.session.notificacion
    });
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/Clases', async function (req, res) {
  if(req.session.email){
    res.render('Clases.ejs', {
      tipo: req.session.tipo,
      notificacion: req.session.notificacion
    });
  } else {
    res.redirect('/IniciarSesion');
  }
});

navigation.get('/hayNotificacion', async function(req, res){
  if(req.session.tipo === "Administrador"){
    res.redirect('/hayNotificacionAdministrador');
  } else if(req.session.tipo === "Instructor"){
    res.redirect('/hayNotificacionInstructor');
  } else {
    res.send({notificacion:false});
  }
});

navigation.get('/hayNotificacionAdministrador', async function(req, res){
  try{
    var notificacion = await ctrlAdm.hayNotificacion(req.session.email);
    req.session.notificacion = notificacion;
    res.send({notificacion});
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesInstructor.get('/hayNotificacionInstructor', async function(req, res){
  try{
    var notificacion = await ctrlInstr.hayNotificacion(req.session.email);
    req.session.notificacion = notificacion;
    res.send({notificacion});
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});


module.exports = navigation;