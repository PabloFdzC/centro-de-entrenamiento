const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesUsuario = Router({caseSensitive:true});
const ctrlUsuario = ControllersSng.getControllerUsuario();

OperacionesUsuario.post('/iniciarSesion', function(req, res){
  var usuario = ctrlUsuario.iniciarSesion(req.body);
  res.send(usuario);
});

module.exports = OperacionesUsuario;