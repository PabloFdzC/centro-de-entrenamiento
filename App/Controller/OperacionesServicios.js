const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesServicios = Router({caseSensitive:true});
const ctrlServicio = ControllersSng.getControllerServicio();

OperacionesServicios.post('/crearServicio', async function(req, res){
  try{
    var r = await ctrlServicio.agregar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
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
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesServicios.get('/mostrarServicios/:esLista', async function(req, res){
  try{
    var lista = await ctrlServicio.listadoServicios();
    if(req.params.esLista){
      res.render('ServiciosLista.ejs', {lista});
    } else {
      res.render('ServiciosCards.ejs', {lista});
    }
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
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
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

module.exports = OperacionesServicios;