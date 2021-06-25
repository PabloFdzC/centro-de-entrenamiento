$('body').ready(function(){
  var perfil = new Perfil();
  $('#email').prop('disabled', true);
  
  $('#formPerfil').submit(async function(event){
    event.preventDefault();
    let form = $('#formPerfil')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await perfil.modificarPerfil(info, tipo);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  $('#formContrasenna').submit(async function(event){
    event.preventDefault();
    let form = $('#formContrasenna')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await perfil.modificarContrasenna(info, tipo);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

});