$('body').ready(function(){
  var pagos = new Pagos();
  
  $('#formPagar').submit(function(event){
    event.preventDefault();
    let form = $('#formPagar')[0];
    let info = new FormData(form);
    pagos.confirmarPago(info);
  });

  var res = pagos.mostrarPendientes();
  if(res){
    $('#pagos').append(res);
  }
});