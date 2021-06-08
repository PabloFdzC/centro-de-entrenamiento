const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesCliente = Router();
const ctrlCliente = ControllerSng.getControllerClase();

OperacionesCliente.post('/crearCliente', function(req, res){
  ctrlCliente.agregar(req.body), res;
});

OperacionesCliente.post('/modificarCliente', function(req, res){
  ctrlCliente.modificar(req.body, res);
});

module.exports = OperacionesCliente;