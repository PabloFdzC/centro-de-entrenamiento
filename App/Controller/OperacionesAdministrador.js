const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesAdministrador = Router();
const ctrlAdm = ControllerSng.getControllerAdministrador();

OperacionesAdministrador.post('/nuevoAdministrador', function(req, res){
  ctrlAdm.agregar(req.body);
});

module.exports = OperacionesAdministrador;