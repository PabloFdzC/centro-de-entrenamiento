const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesSala = Router({caseSensitive:true});
const ctrlSala = ControllersSng.getControllerSala();

OperacionesSala.post('/crearSala', async function(req, res){
  try{
    var r = await ctrlSala.agregar(req.body);
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

OperacionesSala.post('/modificarSala', async function(req, res){
  try{
    var r = await ctrlSala.modificar(req.body);
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

OperacionesSala.get('/mostrarSala', async function(req, res){
  try{
    var sala = await ctrlSala.consultar(req.body);
    res.render('Sala.ejs', {sala});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesSala.post('/crearCalendario', async function(req, res){
  try{
    var r = await ctrlSala.crearCalendario(req.body);
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

OperacionesSala.post('/modificarCalendario', async function(req, res){
  try{
    var r = await ctrlSala.modificarCalendario(req.body);
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

module.exports = OperacionesSala;