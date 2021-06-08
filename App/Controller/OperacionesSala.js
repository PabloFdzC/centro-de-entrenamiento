const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesSala = Router();
const ctrlSala = ControllerSng.getControllerSala();

OperacionesSala.post('/crearSala', function(req, res){
  ctrlSala.agregar(req.body, res);
});

OperacionesSala.post('/modificarSala', function(req, res){
  ctrlSala.modificar(req.body, res);
});

OperacionesSala.get('/mostrarSala', function(req, res){
  ctrlSala.consultar(req.body, res);
});

OperacionesSala.post('/crearCalendario', function(req, res){
  ctrlSala.crearCalendario(req.body, res);
});

OperacionesSala.post('/modificarCalendario', function(req, res){
  ctrlSala.modificarCalendario(req.body, res);
});

module.exports = OperacionesSala;