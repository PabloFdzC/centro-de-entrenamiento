const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesServicios = Router();
const ctrlServicio = ControllerSng.getControllerServicio();

OperacionesServicios.post('/crearServicio', function(req, res){
  ctrlServicio.agregar(req.info, res);
});

OperacionesServicios.post('/modificarServicio', function(req, res){
  ctrlServicio.modificar(req.info, res);
});

OperacionesServicios.get('/mostrarServicios', function(req, res){
  ctrlServicio.listadoServicios(res);
});

OperacionesServicios.post('/eliminarServicio', function(req, res){
  ctrlServicio.eliminar(req.info, res);
});

module.exports = OperacionesServicios;