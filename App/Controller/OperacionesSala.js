const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesSala = Router({caseSensitive:true});
const ctrlSala = ControllersSng.getControllerSala();

OperacionesSala.post('/crearSala', function(req, res){
  var r = ctrlSala.agregar(req.body);
  res.send(r);
});

OperacionesSala.post('/modificarSala', function(req, res){
  var r = ctrlSala.modificar(req.body);
  res.send(r);
});

OperacionesSala.get('/mostrarSala', function(req, res){
  var sala = ctrlSala.consultar(req.body);
  res.render('Sala.ejs', {sala});
});

OperacionesSala.post('/crearCalendario', function(req, res){
  var r = ctrlSala.crearCalendario(req.body);
  res.send(r);
});

OperacionesSala.post('/modificarCalendario', function(req, res){
  var r = ctrlSala.modificarCalendario(req.body);
  res.send(r);
});

module.exports = OperacionesSala;