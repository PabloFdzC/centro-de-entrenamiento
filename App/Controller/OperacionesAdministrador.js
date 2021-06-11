const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesAdministrador = Router({caseSensitive:true});
const ctrlAdm = ControllersSng.getControllerAdministrador();

OperacionesAdministrador.post('/nuevoAdministrador', async function(req, res){
  try{
    var contrasenna = await ctrlAdm.agregar(req.body);
    res.send({contrasenna});
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

OperacionesAdministrador.post('/modificarContrasennaAdministrador', async function(req, res){
  try{
    var r = await ctrlAdm.modificarContrasenna(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

module.exports = OperacionesAdministrador;