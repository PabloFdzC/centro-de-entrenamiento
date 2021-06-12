$('body').ready(function(){
  var na = new NuevoAdministrador();
  $('#formNuevoAdmin').submit(function(event){
    event.preventDefault();
    let form = $('#formNuevoAdmin')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      na.enviarCorreo(info);
    }
  });
});