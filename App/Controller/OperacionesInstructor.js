const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesInstructor = Router();
const ctrlInstr = ControllerSng.getControllerInstructor();

OperacionesInstructor.post('/crearInstructor', function(req, res){
  ctrlInstr.agregar(req.body, res);
});

OperacionesInstructor.post('/modificarInstructor', function(req, res){
  ctrlInstr.modifcar(req.body, res);
});

OperacionesInstructor.get('/mostrarInstructor', function(req, res){
  ctrlInstr.consultar(req.body, res);
});

OperacionesInstructor.get('/mostrarInstructores', function(req, res){
  ctrlInstr.mostrarInstructores(res);
});

OperacionesInstructor.post('/eliminarInstructor', function(req, res){
  ctrlInstr.eliminar(req.body, res);
});

module.exports = OperacionesInstructor;