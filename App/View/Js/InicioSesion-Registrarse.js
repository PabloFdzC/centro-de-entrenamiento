$('body').ready(function(){
  var ini = new IniciarSesion();
  var reg = new Registrarse();

  muestraIniciarSesion = function (){
    $('#cardCont').css("width", "27rem");
    $('#Registrarse').addClass('esconde');
    $('#IniciarSesion').removeClass('esconde');
  }
  
  muestraRegistrarse = function(){
    $('#cardCont').css("width", "40rem");
    $('#Registrarse').removeClass('esconde');
    $('#IniciarSesion').addClass('esconde');
  }

  $('#formIniciarSesion').submit(async function(event){
    event.preventDefault();
    let form = $('#formIniciarSesion')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await ini.iniciarSesion(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#formRegistrarse').submit(async function(event){
    event.preventDefault();
    let form = $('#formRegistrarse')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await reg.registrarCliente(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  muestraIniciarSesion();
  $('#cardB').on('click', '.irRegistrarse',muestraRegistrarse);
  $('#cardB').on('click', '.irInicioSesion',muestraIniciarSesion);
});
