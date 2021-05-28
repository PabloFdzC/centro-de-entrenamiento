const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesInstructor = Router();
const ctrlInstr = ControllerSng.getControllerInstructor();

OperacionesInstructor.post('/crearInstructor', function(req, res){
  ctrlInstr.agregar(req.body);
});

OperacionesInstructor.post('/modificarInstructor', function(req, res){
  ctrlInstr.modifcar(req.body);
});

OperacionesInstructor.get('/mostrarInstructor', function(req, res){
  ctrlInstr.consultar(req.body);
});

OperacionesInstructor.get('/mostrarInstructores', function(req, res){
  ctrlInstr.mostrarInstructores(req.body);
});

OperacionesInstructor.post('/eliminarInstructor', function(req, res){
  ctrlInstr.eliminar(req.body);
});

module.exports = OperacionesInstructor;