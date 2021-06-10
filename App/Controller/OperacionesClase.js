const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesClase = Router({caseSensitive:true});
const ctrlClase = ControllersSng.getControllerClase();

OperacionesClase.post('/crearClase', function(req, res){
  var r = ctrlClase.agregar(req.body);
  res.send(r);
});

OperacionesClase.post('/modificarClase', function(req, res){
  var r = ctrlClase.modificar(req.body);
  res.send(r);
});

OperacionesClase.get('/mostrarClasesPorMes', function(req, res){
  var lista = ctrlClase.clasesPorMes(req.body);
  res.send(lista);
});

OperacionesClase.get('/mostrarReservas', function(req, res){
  var lista = ctrlClase.listadoReservas(req.body);
  res.render('Clientes.ejs', {lista});
});

OperacionesClase.post('/matricularClase', function(req, res){
  var r = ctrlClase.matricularClase(req.body);
  res.send(r);
});

OperacionesClase.post('/cancelarMatricula', function(req, res){
  var r = ctrlClase.cancelarMatricula(req.body);
  res.send(r);
});

module.exports = OperacionesClase;