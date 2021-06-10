$('body').ready(function(){
  $('#enviar').click(function(event){
    var form = $('#nuevoAdministradorForm')[0];
    var info = new FormData(form);
    na = new NuevoAdministrador();
    na.enviarCorreo(info);
  });
});