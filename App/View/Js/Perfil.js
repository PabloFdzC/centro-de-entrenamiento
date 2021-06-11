$('body').ready(function(){
  var perfil = new Perfil();
  
  $('#formPerfil').submit(function(event){
    event.preventDefault();
    let form = $('#formPerfil')[0];
    let info = new FormData(form);
    perfil.modificarPerfil(info);
  });

  $('#formContrasenna').submit(function(event){
    event.preventDefault();
    let form = $('#formContrasenna')[0];
    let info = new FormData(form);
    perfil.modificarContrasenna(info);
  });

});