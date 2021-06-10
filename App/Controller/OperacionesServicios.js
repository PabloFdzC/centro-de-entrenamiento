const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesServicios = Router({caseSensitive:true});
const ctrlServicio = ControllersSng.getControllerServicio();

OperacionesServicios.post('/crearServicio', function(req, res){
  ctrlServicio.agregar(req.info, res);
});

OperacionesServicios.post('/modificarServicio', function(req, res){
  ctrlServicio.modificar(req.info, res);
});

OperacionesServicios.get('/mostrarServicios', function(req, res){
  ctrlServicio.listadoServicios();
  if(req.body.esLista){
    res.send(lista);
  } else {
    res.render('ServiciosCards.ejs', {lista});
  }
});

OperacionesServicios.post('/eliminarServicio', function(req, res){
  ctrlServicio.eliminar(req.info, res);
});

module.exports = OperacionesServicios;