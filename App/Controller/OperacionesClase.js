const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesClase = Router({caseSensitive:true});
const ctrlClase = ControllersSng.getControllerClase();

OperacionesClase.post('/crearClase', async function(req, res){
  try{
    var r = await ctrlClase.agregar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear la clase por que ya existe");
    else
      res.send("Algo salió mal");
  }
});

OperacionesClase.post('/modificarClase', async function(req, res){
  try{
    var r = await ctrlClase.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo modificar la clase");
    else
      res.send("Algo salió mal");
  }
});

OperacionesClase.get('/mostrarClasesPorMes/:mes', async function(req, res){
  try{
    var lista = await ctrlClase.clasesPorMes(req.params.mes);
    res.send(lista);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesClase.get('/mostrarReservas/:idClase', async function(req, res){
  try{
    var lista = await ctrlClase.listadoReservas(req.params.idClase);
    res.render('Clientes.ejs', {lista});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesClase.post('/matricularClase', async function(req, res){
  try{
    var r = await ctrlClase.matricularClase(req.body);
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

OperacionesClase.post('/cancelarMatricula', async function(req, res){
  try{
    var r = await ctrlClase.cancelarMatricula(req.body);
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

OperacionesClase.get('/getMatriculasClase/:idClase', async function(req, res){
  try{
    var r = await ctrlClase.getMatriculasClase(req.params.idClase);
    res.render('MatriculasClase.ejs', r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

module.exports = OperacionesClase;