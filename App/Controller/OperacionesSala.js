const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesSala = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlSala = ctrlSng.getControllerSala();

OperacionesSala.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

OperacionesSala.post('/crearSala', async function(req, res){
  try{
    req.body.servicios = await JSON.parse(req.body.servicios);
    req.body.calendario = await JSON.parse(req.body.calendario);
    req.body.calendario = await listaAJson(req.body.calendario);
    var r = await ctrlSala.agregar(req.body);
    res.send({id:r});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("Ya existe esa sala");
    else
      res.send("Algo salió mal");
  }
});

OperacionesSala.post('/modificarSala', async function(req, res){
  try{
    req.body.serviciosE = await JSON.parse(req.body.serviciosE);
    req.body.servicios = await JSON.parse(req.body.servicios);
    req.body.calendarioE = await JSON.parse(req.body.calendarioE);
    req.body.calendario = await JSON.parse(req.body.calendario);
    req.body.calendario = await listaAJson(req.body.calendario);
    var r = await ctrlSala.modificar(req.body);
    res.send({id:r});
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesSala.get('/mostrarSala', async function(req, res){
  try{
    var sala = await ctrlSala.consultar(req.query.idSala);
    if(req.query.card === "true"){
      res.render('SalaCards.ejs', {lista:[sala]});
    } else {
      res.send(sala);
    }
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesSala.get('/mostrarSalasSimple', async function(req, res){
  try{
    var lista = await ctrlSala.mostrarTodosSimple();
    var r = [];
    for(let e of lista){
      r.push(e.convertirAVista());
    }
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesSala.get('/mostrarSalas', async function(req, res){
  try{
    var lista = await ctrlSala.mostrarTodos();
    res.render('SalaCards.ejs', {lista}, function(err, html){
      if(err){
        console.log(err);
        res.status(400);
        res.send("Algo salió mal");    
      } else {
        var salas = [];
        for(let s of lista){
          salas.push(s.convertirAVista());
        }
        res.send({html, salas});
      }
    });
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});


async function listaAJson(lista){
  var l = [];
  for(let i = 0; i < lista.length; i++){
    let p = await JSON.parse(lista[i]);
    l.push(p);
  }
  return l;
}

module.exports = OperacionesSala;