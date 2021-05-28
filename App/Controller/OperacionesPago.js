const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesPago = Router();
const ctrlPago = ControllerSng.getControllerPago();

OperacionesPago.post('/mostrarPendientes', function(req, res){
  ctrlPago.mostrarPendientes(req.body);
});

OperacionesPago.post('/realizarPago', function(req, res){
  ctrlPago.agregar(req.body);
});

module.exports = OperacionesPago;