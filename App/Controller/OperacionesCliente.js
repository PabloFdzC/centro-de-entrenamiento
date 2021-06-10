const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesCliente = Router({caseSensitive:true});
const ctrlCliente = ControllersSng.getControllerClase();

OperacionesCliente.post('/crearCliente', function(req, res){
  var r = ctrlCliente.agregar(req.body);
  res.send(r);
});

OperacionesCliente.post('/modificarCliente', function(req, res){
  var r = ctrlCliente.modificar(req.body);
  res.send(r);
});

OperacionesUsuario.post('/modificarContrasennaCliente', function(req, res){
  var r = ctrlCliente.modificarContrasenna(req.body);
  res.send(r);
});

module.exports = OperacionesCliente;