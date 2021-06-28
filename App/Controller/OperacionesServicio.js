const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesServicios = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlServicio = ctrlSng.getControllerServicio();

OperacionesServicios.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

OperacionesServicios.post('/crearServicio', async function(req, res){
  try{
    var r = await ctrlServicio.agregar(req.body);
    res.send({id:r});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("Ya existe un servicio con ese nombre");
    else
      res.send("Algo salió mal");
  }
});

OperacionesServicios.post('/modificarServicio', async function(req, res){
  try{
    var r = await ctrlServicio.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesServicios.get('/mostrarServicios', async function(req, res){
  try{
    var lista = await ctrlServicio.mostrarTodos();
    if(req.query.esLista === "true"){
      res.render('ServiciosLista.ejs', {lista});
    } else {
      res.render('ServiciosCards.ejs', {lista}, function(err, html){
        if(err){
          console.log(err);
          res.status(400);
          res.send("Algo salió mal");      
        } else {
          var l = [];
          for(let s of lista){
            l.push(s.convertirAVista());
          }
          res.send({html, servicios:l});
        }
      });
    }
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesServicios.post('/eliminarServicio', async function(req, res){
  try{
    var r = await ctrlServicio.eliminar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_ROW_IS_REFERENCED_2')
      res.send("No se pudo eliminar el servicio está siendo usado por alguna sala, clase o instructor");
    else
      res.send("Algo salió mal");
  }
});

module.exports = OperacionesServicios;