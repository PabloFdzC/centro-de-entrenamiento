const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesSala = Router({caseSensitive:true});
const ctrlSala = ControllersSng.getControllerSala();

OperacionesSala.post('/crearSala', async function(req, res){
  try{
    req.body.servicios = JSON.parse(req.body.servicios);
    req.body.calendario = JSON.parse(req.body.calendario);
    var r = await ctrlSala.agregar(req.body);
    var r3 = await ctrlSala.crearCalendario(req.body.calendario);
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
    req.body.serviciosE = JSON.parse(req.body.serviciosE);
    req.body.serviciosA = JSON.parse(req.body.serviciosA);
    req.body.calendarioE = JSON.parse(req.body.calendarioE);
    req.body.calendarioA = JSON.parse(req.body.calendarioA);
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

OperacionesSala.get('/mostrarSala/:idSala', async function(req, res){
  try{
    var sala = await ctrlSala.consultar(req.params.idSala);
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

OperacionesSala.get('/mostrarJornadasDelMes/:mes', async function(req, res){
  try{
    var sala = await ctrlSala.jornadasDeMes(req.params.mes);
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

OperacionesSala.get('/mostrarSalas', async function(req, res){
  try{
    var salas = await ctrlSala.consultarSalas(req.body);
    res.render('Sala.ejs', {salas});
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