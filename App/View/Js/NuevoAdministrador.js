$('body').ready(function(){
  var na = new NuevoAdministrador();
  $('#formNuevoAdmin').submit(async function(event){
    event.preventDefault();
    let form = $('#formNuevoAdmin')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      var r;
      try{
        r = await na.enviarCorreo(info);
        muestraMensaje("Éxito", "La contraseña del nuevo administrador es: "+r.contrasenna);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });
});