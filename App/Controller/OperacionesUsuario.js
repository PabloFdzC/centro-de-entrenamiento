const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesUsuario = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlUsuario = ctrlSng.getControllerUsuario();

OperacionesUsuario.post('/iniciarSesion', async function(req, res){
  try{
    var usuario = await ctrlUsuario.iniciarSesion(req.body);
    req.session.email = usuario.email;
    req.session.tipo = usuario.tipo_usuario;
    res.send(usuario);
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == "ER_LOGIN")
      res.send("Email o contraseña incorrecta");
    else
      res.send("Algo salió mal");
  }
});

module.exports = OperacionesUsuario;