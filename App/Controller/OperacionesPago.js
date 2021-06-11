const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesPago = Router({caseSensitive:true});
const ctrlPago = ControllersSng.getControllerPago();

OperacionesPago.post('/mostrarPendientes', async function(req, res){
  try{
    var r = await ctrlPago.mostrarPendientes(req.body);
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

OperacionesPago.post('/crearPago', async function(req, res){
  try{
    var r = await ctrlPago.agregar(req.body);
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

OperacionesPago.post('/realizarPago', async function(req, res){
  try{
    var lista = await ctrlPago.realizarPago(req.body);
    res.render('PagosCards.ejs', {lista});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesPago.post('/pagoMoroso', async function(req, res){
  try{
    var r = await ctrlPago.pagoMoroso(req.body);
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

module.exports = OperacionesPago;