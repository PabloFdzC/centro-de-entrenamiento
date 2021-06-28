$('body').ready(async function(){
  var cla = new Clase();
  var clases = [];

  cargar = async function(){
    try{
      var res;
      if(tipo === "Administrador"){
        res = await cla.mostrarClasesEnEspera();
      } else {
        res = await cla.mostrarClasesAutorizadas();
      }
      if(res){
        $('#clases').empty();
        $('#clases').append(res.html);
        clases = res.clases;
        if(clases.length === 0){
          if($('#notificacion').children().length > 0){
            $('#notificacion').empty('<div class="puntoAmarillo"></div>');
          }
        }
      }
    }catch(err){
      console.log(err);
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('body').on('click', '.publicarTodas', async function(){
    try{
      await cla.publicarTodas(clases);
      await cargar();
    }catch(err){
      console.log(err);
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('body').on('click', '.publicar', async function(){
    try{
    let val = parseInt($(this).val());
    let i = clases.indexOf(val);
    if (i > -1) {
      clases.splice(i, 1);
      $(this).remove();
      await cla.publicarClase(val);
      await cargar();
    }
  }catch(err){
    console.log(err);
    muestraMensaje("Fallo", err.responseText);
  }
  });

  cargar();
});