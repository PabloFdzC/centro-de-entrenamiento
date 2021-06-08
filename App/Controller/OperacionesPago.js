const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesPago = Router();
const ctrlPago = ControllerSng.getControllerPago();

OperacionesPago.post('/mostrarPendientes', function(req, res){
  ctrlPago.mostrarPendientes(req.body, res);
});

OperacionesPago.post('/crearPago', function(req, res){
  ctrlPago.agregar(req.body, res);
});

OperacionesPago.post('/realizarPago', function(req, res){
  ctrlPago.realizarPago(req.body, res);
});

OperacionesPago.post('/pagoMoroso', function(req, res){
  ctrlPago.realizarPago(req.body, res);
});

module.exports = OperacionesPago;