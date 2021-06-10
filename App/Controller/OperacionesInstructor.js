const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesInstructor = Router({caseSensitive:true});
const ctrlInstr = ControllersSng.getControllerInstructor();

OperacionesInstructor.post('/crearInstructor', function(req, res){
  var r = ctrlInstr.agregar(req.body, res);
  res.send(r);
});

OperacionesInstructor.post('/modificarInstructor', function(req, res){
  var r = ctrlInstr.modifcar(req.body, res);
  res.send(r);
});

OperacionesInstructor.get('/mostrarInstructor', function(req, res){
  var instructor = ctrlInstr.consultar(req.body, res);
  res.render('Perfil.ejs', {instructor});
});

OperacionesInstructor.get('/mostrarInstructores', function(req, res){
  var lista = ctrlInstr.mostrarInstructores(res);
  res.render('InstructoresCards.ejs', {lista});
});

OperacionesInstructor.post('/eliminarInstructor', function(req, res){
  var r = ctrlInstr.eliminar(req.body, res);
  res.send(r);
});

OperacionesUsuario.post('/modificarContrasennaInstructor', function(req, res){
  var r = ctrlInstr.modificarContrasenna(req.body);
  res.send(r);
});

module.exports = OperacionesInstructor;