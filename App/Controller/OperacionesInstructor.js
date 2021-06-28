const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesInstructor = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlInstr = ctrlSng.getControllerInstructor();

OperacionesInstructor.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

OperacionesInstructor.post('/crearInstructor', async function(req, res){
  try{
    req.body.servicios = JSON.parse(req.body.servicios);
    var contrasenna = await ctrlInstr.agregar(req.body);
    res.send({contrasenna});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("Ya existe un instructor con ese correo");
    else
      res.send("Algo salió mal");
  }
});

OperacionesInstructor.get('/mostrarInstructor', async function(req, res){
  try{
    var instructor = await ctrlInstr.consultar(req.query.email);
    res.send(instructor.convertirAVista());
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
    req.body.servicios = await JSON.parse(req.body.servicios);
    req.body.serviciosE = await JSON.parse(req.body.serviciosE);
    if(req.session.tipo === "Instructor"){
      req.body.email = req.session.email;
    }
    var r = await ctrlInstr.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
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
    if(err.code == 'ER_ROW_IS_REFERENCED_2')
      res.send("No se pudo eliminar el instructor tiene clases a su nombre");
    else
      res.send("Algo salió mal");
  }
});

OperacionesInstructor.get('/mostrarInstructores', async function(req, res){
  try{
    var lista = await ctrlInstr.mostrarTodos();
    if(req.query.esLista === "true"){
      res.render('InstructoresLista.ejs', {lista});
    } else {
      res.render('InstructoresCards.ejs', {lista});
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

OperacionesInstructor.post('/modificarContrasennaInstructor', async function(req, res){
  try{
    req.body.email = req.session.email;
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

OperacionesInstructor.get('/mostrarClasesAutorizadas', async function(req, res){
  try{
    var clases = await ctrlInstr.mostrarClasesAutorizadas(req.session.email);
    res.render('ClasesCards.ejs',
    {clases, tipo: req.session.tipo},
    function(err, html){
      if(err){
        console.log(err);
        res.status(400);
        res.send("Algo salió mal");    
      } else {
        claseIds = [];
        for(let c of clases){
          claseIds.push(c.getId());
        }
        res.send({html, clases:claseIds});
      }
    });
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

module.exports = OperacionesInstructor;