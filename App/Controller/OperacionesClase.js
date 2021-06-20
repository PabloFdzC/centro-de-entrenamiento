const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesClase = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlClase = ctrlSng.getControllerClase();
const ctrlMatriculaClase = ctrlSng.getControllerMatriculaClase();

OperacionesClase.post('/crearClase', async function(req, res){
  try{
    req.body.dia = new Date(req.body.dia);
    req.body.emailInstructor = req.session.email;
    var r = await ctrlClase.agregar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    switch(err.code){
      case "ER_DUP_ENTRY":
        res.send("Ya existe la clase");
        break;
      case "ER_NO_ID_JORNADA":
        res.send("La sala está cerrada en el horario escogido");
        break;
      default:
        res.send("Algo salió mal");
        break;  
    }
  }
});

OperacionesClase.post('/modificarClase', async function(req, res){
  try{
    var r = await ctrlClase.modificar(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    switch(err.code){
      case "ER_NO_ID_JORNADA":
        res.send("La sala está cerrada en el horario escogido");
        break;
      default:
        res.send("Algo salió mal");
        break;  
    }
  }
});

OperacionesClase.get('/mostrarClase', async function(req, res){
  try{
    var clase = await ctrlClase.consultar({id:req.query.idClase});
    res.send(clase.convertirAVista());
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesClase.get('/mostrarClasesPorMes', async function(req, res){
  try{
    var lista = await ctrlClase.mostrarTodoXMes({mes:req.query.mes, idSala:req.query.mes});
    res.send(lista);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesClase.get('/mostrarPersonasMatriculadas', async function(req, res){
  try{
    var lista = await ctrlMatriculaClase.mostrarPersonasMatriculadas(req.query.idClase);
    res.render('Clientes.ejs', {lista});
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesClase.post('/matricularClase', async function(req, res){
  try{
    var r = await ctrlMatriculaClase.matricularClase(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo matricular la clase");
    else
      res.send("Algo salió mal");
  }
});

OperacionesClase.post('/cancelarMatricula', async function(req, res){
  try{
    var r = await ctrlMatriculaClase.cancelarMatricula(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

module.exports = OperacionesClase;