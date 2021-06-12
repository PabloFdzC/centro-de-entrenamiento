$('body').ready(function(){
  var pagos = new Pagos();
  
  $('#formPagar').submit(function(event){
    event.preventDefault();
    let form = $('#formPagar')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      pagos.confirmarPago(info);
    }
  });

  cargar = async function(){
    var res = await pagos.mostrarPendientes();
    if(res){
      $('#pagos').append(res);
    }
  };

  cargar();
});