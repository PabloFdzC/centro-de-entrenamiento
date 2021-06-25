const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesClase = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlClase = ctrlSng.getControllerClase();
const ctrlMatriculaClase = ctrlSng.getControllerMatriculaClase();
const RegistroClaseInst = require('./RegistroClaseInst.js');
const RegistroClaseAdm = require('./RegistroClaseAdm.js');

OperacionesClase.post('/crearClase', async function(req, res){
  try{
    var strategy;
    if(req.session.tipo === "Instructor"){
      strategy = new RegistroClaseInst();
      strategy.setEmailInstructor(req.session.email);
      ctrlClase.setStrategyRegistro(strategy);
    } else if(req.session.tipo === "Administrador"){
      ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
    }
    var r = await ctrlClase.agregar(req.body);
    res.send({id:r});
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
      case "ER_NO_DISPONIBLE":
        res.send("No se pudo cambiar al horario escogido");
        break;
      case "ER_SIGNAL_EXCEPTION":
        res.send(err.sqlMessage);
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