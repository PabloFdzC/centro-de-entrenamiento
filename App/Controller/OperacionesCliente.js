const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesCliente = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlCliente = ctrlSng.getControllerCliente();

OperacionesCliente.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

OperacionesCliente.post('/crearCliente', async function(req, res){
  try{
    var r = await ctrlCliente.agregar(req.body);
    res.send({id:r});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("Ya existe un usuario con ese correo");
    else
      res.send(err.code);
  }
});

OperacionesCliente.get('/mostrarCliente', async function(req, res){
  try{
    var cliente = await ctrlCliente.consultar(req.query.email);
    res.send(cliente.convertirAVista());
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesCliente.post('/modificarCliente', async function(req, res){
  try{
    req.body.email = req.session.email;
    var r = await ctrlCliente.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesCliente.get('/mostrarClientes', async function(req, res){
  try{
    var lista = await ctrlCliente.mostrarTodos();
    res.render('ClientesCards.ejs',{lista});
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
    req.body.email = req.session.email;
    var r = await ctrlCliente.modificarContrasenna(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

module.exports = OperacionesCliente;