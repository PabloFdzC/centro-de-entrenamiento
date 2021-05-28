const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesCliente = Router();
const ctrlCliente = ControllerSng.getControllerClase();

OperacionesCliente.post('/crearCliente', function(req, res){
  ctrlCliente.agregar(req.body);
});

OperacionesCliente.post('/modificarCliente', function(req, res){
  ctrlCliente.modificar(req.body);
});

module.exports = OperacionesCliente;