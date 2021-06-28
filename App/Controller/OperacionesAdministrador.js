const { Router} = require('express');
const ControllersSng = require('./ControllersSng.js');
const OperacionesAdministrador = Router({caseSensitive:true});
const ctrlSng = ControllersSng.getInstance();
const ctrlAdm = ctrlSng.getControllerAdministrador();

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
    req.body.email = req.session.email;
    var r = await ctrlAdm.modificarContrasenna(req.body);
    res.send(r);
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesAdministrador.get('/mostrarClasesEnEspera', async function(req, res){
  try{
    var clases = await ctrlAdm.mostrarClasesEnEspera(req.session.email);
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

module.exports = OperacionesAdministrador;