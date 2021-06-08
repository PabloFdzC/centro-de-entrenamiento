const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesClase = Router();
const ctrlClase = ControllerSng.getControllerClase();

OperacionesClase.post('/crearClase', function(req, res){
  ctrlClase.agregar(req.body, res);
});

OperacionesClase.post('/modificarClase', function(req, res){
  ctrlClase.modificar(req.body, res);
});

OperacionesClase.get('/mostrarClasesPorMes', function(req, res){
  ctrlClase.clasesPorMes(req.body, res);
});

OperacionesClase.get('/mostrarReservas', function(req, res){
  ctrlClase.listadoReservas(req.body, res);
});

OperacionesClase.post('/matricularClase', function(req, res){
  ctrlClase.matricularClase(req.body, res);
});

OperacionesClase.post('/cancelarMatricula', function(req, res){
  ctrlClase.cancelarMatricula(req.body, res);
});

module.exports = OperacionesClase;