const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesServicios = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlServicio = ctrlSng.getControllerServicio();

OperacionesServicios.post('/crearServicio', async function(req, res){
  try{
    var r = await ctrlServicio.agregar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("Ya existe un servicio con ese nombre");
    else
      res.send("Algo salió mal");
  }
});

OperacionesServicios.post('/modificarServicio', async function(req, res){
  try{
    var r = await ctrlServicio.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesServicios.get('/mostrarServicios', async function(req, res){
  try{
    var lista = await ctrlServicio.mostrarTodos();
    if(req.query.esLista === "true"){
      res.render('ServiciosLista.ejs', {lista});
    } else {
      res.render('ServiciosCards.ejs', {lista});
    }
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesServicios.post('/eliminarServicio', async function(req, res){
  try{
    var r = await ctrlServicio.eliminar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

module.exports = OperacionesServicios;