const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesSala = Router();
const ctrlSala = ControllerSng.getControllerSala();

OperacionesSala.post('/crearSala', function(req, res){
  ctrlSala.agregar(req.body);
});

OperacionesSala.post('/modificarSala', function(req, res){
  ctrlSala.modificar(req.body);
});

OperacionesSala.get('/mostrarSala', function(req, res){
  ctrlSala.consultar(req.body);
});

OperacionesSala.post('/crearCalendario', function(req, res){
  ctrlSala.crearCalendario(req.body);
});

OperacionesSala.post('/modificarCalendario', function(req, res){
  ctrlSala.modificarCalendario(req.body);
});

module.exports = OperacionesSala;