const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesPago = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlPago = ctrlSng.getControllerPago();

OperacionesPago.post('/crearPago', async function(req, res){
  try{
    var r = await ctrlPago.agregar(req.body);
    res.send({id:r});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("El pago ya existe");
    else
      res.send("Algo salió mal");
  }
});

OperacionesPago.post('/realizarPago', async function(req, res){
  try{
    var r = await ctrlPago.realizarPago(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesPago.get('/mostrarPendientes', async function(req, res){
  try{
    var lista = await ctrlPago.mostrarPendientes(req.query.email);
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

module.exports = OperacionesPago;