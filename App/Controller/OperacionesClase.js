const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesClase = Router();
const ctrlClase = ControllerSng.getControllerClase();

OperacionesClase.post('/crearClase', function(req, res){
  ctrlClase.agregar(req.body);
});

OperacionesClase.post('/modificarClase', function(req, res){
  ctrlClase.modificar(req.body);
});

OperacionesClase.get('/mostrarClasesPorMes', function(req, res){
  ctrlClase.clasesPorMes(req.body);
});

OperacionesClase.get('/mostrarReservas', function(req, res){
  ctrlClase.listadoReservas(req.body);
});

OperacionesClase.post('/matricularClase', function(req, res){
  ctrlClase.matricularClase(req.body);
});

OperacionesClase.post('/cancelarMatricula', function(req, res){
  ctrlClase.cancelarMatricula(req.body);
});

module.exports = OperacionesClase;