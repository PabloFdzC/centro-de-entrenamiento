$('body').ready(function(){
  var pagos = new Pagos();
  var pagoActual;
  var modalP = new bootstrap.Modal(document.getElementById('modalPagar'));

  const limpiarModal = function(){
    $('#formClase').removeClass('was-validated');
    $('#formaDePago').val("").change();
  };

  $('#modalPagar').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });
  
  $('#formPagar').submit(async function(event){
    event.preventDefault();
    let form = $('#formPagar')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      info.set("id", pagoActual);
      try{
        await pagos.realizarPago(info);
        cargar();
        modalP.hide();
      }catch(err){
        console.log(err);
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  $('body').on('click','.activaPago', function(){
    pagoActual = $(this).attr('value');
  });

  cargar = async function(){
    try{
      var res = await pagos.mostrarPendientes();
      if(res){
        $('#pagos').empty();
        $('#pagos').append(res);
      }
    }catch(err){
      console.log(err);
      muestraMensaje("Fallo", err.responseText);
    }
  };

  cargar();
});