const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesPago = Router({caseSensitive:true});
const ctrlPago = ControllersSng.getControllerPago();

OperacionesPago.post('/mostrarPendientes', function(req, res){
  var r = ctrlPago.mostrarPendientes(req.body);
  res.send(r);
});

OperacionesPago.post('/crearPago', function(req, res){
  var r = ctrlPago.agregar(req.body);
  res.send(r);
});

OperacionesPago.post('/realizarPago', function(req, res){
  var lista = ctrlPago.realizarPago(req.body);
  res.render('PagosCards.ejs', {lista});
});

OperacionesPago.post('/pagoMoroso', function(req, res){
  var r = ctrlPago.pagoMoroso(req.body);
  res.send(r);
});

module.exports = OperacionesPago;