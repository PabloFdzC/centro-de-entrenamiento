const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesInstructor = Router({caseSensitive:true});
const ctrlInstr = ControllersSng.getControllerInstructor();

OperacionesInstructor.post('/crearInstructor', async function(req, res){
  try{
    var r = await ctrlInstr.agregar(req.body);
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

OperacionesInstructor.post('/modificarInstructor', async function(req, res){
  try{
    var r = await ctrlInstr.modifcar(req.body);
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

OperacionesInstructor.get('/mostrarInstructor/:email', async function(req, res){
  try{
    var instructor = await ctrlInstr.consultar(req.params.email);
    res.send(instructor);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesInstructor.get('/mostrarInstructores', async function(req, res){
  try{
    var lista = await ctrlInstr.mostrarInstructores();
    res.render('InstructoresCards.ejs', {lista});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesInstructor.post('/eliminarInstructor', async function(req, res){
  try{
    var r = await ctrlInstr.eliminar(req.body);
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

OperacionesInstructor.post('/modificarContrasennaInstructor', async function(req, res){
  try{
    var r = await ctrlInstr.modificarContrasenna(req.body);
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

module.exports = OperacionesInstructor;