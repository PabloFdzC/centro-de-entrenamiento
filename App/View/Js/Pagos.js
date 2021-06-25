$('body').ready(function(){
  var pagos = new Pagos();
  
  $('#formPagar').submit(async function(event){
    event.preventDefault();
    let form = $('#formPagar')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await pagos.realizarPago(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  cargar = async function(){
    try{
      var res = await pagos.mostrarPendientes();
      if(res){
        $('#pagos').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  cargar();
});