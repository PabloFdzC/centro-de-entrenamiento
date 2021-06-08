const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesUsuario = Router();
const ctrlUsuario = ControllerSng.getControllerUsuario();

OperacionesUsuario.post('/iniciarSesion', function(req, res){
  ctrlUsuario.iniciarSesion(req, res);
});

OperacionesUsuario.post('/modificarContrasenna', function(req, res){
  ctrlUsuario.modificarContrasenna(req.info, res);
});

module.exports = OperacionesUsuario;