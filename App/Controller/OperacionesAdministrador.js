const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesAdministrador = Router({caseSensitive:true});
const ctrlAdm = ControllersSng.getControllerAdministrador();

OperacionesAdministrador.post('/nuevoAdministrador', function(req, res){
  console.log(req);
  var r = ctrlAdm.agregar(req.body);
  res.send(r);
});

OperacionesUsuario.post('/modificarContrasennaAdministrador', function(req, res){
  var r = ctrlAdm.modificarContrasenna(req.body);
  res.send(r);
});

module.exports = OperacionesAdministrador;