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

  $('#formIniciarSesion').submit(function(event){
    event.preventDefault();
    let form = $('#formIniciarSesion')[0];
    let info = new FormData(form);
    ini.IniciarSesion(info);
  });

  $('#formRegistrarse').submit(function(event){
    event.preventDefault();
    let form = $('#formRegistrarse')[0];
    let info = new FormData(form);
    reg.registrarse(info);
  });

  muestraIniciarSesion();
  $('#cardB').on('click', '.irRegistrarse',muestraRegistrarse);
  $('#cardB').on('click', '.irInicioSesion',muestraIniciarSesion);
});
