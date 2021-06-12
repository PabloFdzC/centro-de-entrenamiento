const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesUsuario = Router({caseSensitive:true});
const ctrlUsuario = ControllersSng.getControllerUsuario();

OperacionesUsuario.post('/iniciarSesion', async function(req, res){
  try{
    var usuario = await ctrlUsuario.iniciarSesion(req.body);
    res.send(usuario);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Email o contraseña incorrecta");
  }
});

module.exports = OperacionesUsuario;