const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesCliente = Router({caseSensitive:true});
const ctrlCliente = ControllersSng.getControllerClase();

OperacionesCliente.post('/crearCliente', async function(req, res){
  try{
    console.log(req.body);
    var r = await ctrlCliente.agregar(req.body);
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

OperacionesCliente.post('/modificarCliente', async function(req, res){
  try{
    var r = await ctrlCliente.modificar(req.body);
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

OperacionesCliente.post('/modificarContrasennaCliente', async function(req, res){
  try{
    var r = await ctrlCliente.modificarContrasenna(req.body);
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

module.exports = OperacionesCliente;