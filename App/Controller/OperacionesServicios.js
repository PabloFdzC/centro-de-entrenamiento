const { Router} = require('express');
const ControllerSng = require('ControllerSng.js');
const OperacionesServicios = Router();
const ctrlServicio = ControllerSng.getControllerServicio();

OperacionesServicios.post('/crearServicio', function(req, res){
  ctrlServicio.agregar(req.info);
});

OperacionesServicios.post('/modificarServicio', function(req, res){
  ctrlServicio.modificar(req.info);
});

OperacionesServicios.get('/mostrarServicios', function(req, res){
  ctrlServicio.clasesPorMes(req.info);
});

OperacionesServicios.post('/eliminarServicio', function(req, res){
  ctrlServicio.eliminar(req.info);
});

module.exports = OperacionesServicios;