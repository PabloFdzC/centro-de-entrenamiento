const { Router} = require('express');
const OperacionesJornada = Router({caseSensitive:true});
const ControllersSng = require('./ControllersSng.js');
const ctrlSng = ControllersSng.getInstance();
const ctrlJornada = ctrlSng.getControllerJornada();

OperacionesJornada.get('/mostrarClasesJornada', async function(req, res){
  try{
    var jornada = null;
    if(req.query.idJornada && req.query.idJornada != ""){
      jornada = await ctrlJornada.consultar({id:req.query.idJornada});
    }
    res.render('ClasesDiaCalendario.ejs', {jornada, tipo:req.session.tipo}, function(err, html){
      if(err){
        console.log(err);
        res.status(400);
        res.send("Algo salió mal");
      } else {
        res.send({jornada:jornada.convertirAVista(), html});
      }
    });
  }catch(err){
    console.log(err);
    res.status(400);
    res.send("Algo salió mal");
  }
});

OperacionesJornada.get('/mostrarCalendario', async function(req, res){
  try{
    let mes = parseInt(req.query.mesUsuario);
    var jornadas = await ctrlJornada.mostrarCalendario({mes:mes+1, idSala:req.query.idSala});
    res.render('DiasCalendario.ejs',{
      jornadas, 
      annoUsuario:parseInt(req.query.annoUsuario),
      mesUsuario:parseInt(req.query.mesUsuario),
      annoActual:parseInt(req.query.annoActual),
      mesActual:parseInt(req.query.mesActual),
      diaActual:parseInt(req.query.diaActual)
    },function(err,html){
      if(err){
        console.log(err);
        res.status(400);
        res.send("Algo salió mal");
      } else {
        let jornadasO = [];
        for(let j of jornadas){
          jornadasO.push(j.convertirAVista());
        }
        res.send({html, jornadas:jornadasO});
      }
    });
  }catch(err){
    console.log(err);
    res.status(400);
    if(err.code == 'ER_DUP_ENTRY')
      res.send("No se pudo crear el administrador");
    else
      res.send("Algo salió mal");
  }
});

module.exports = OperacionesJornada;