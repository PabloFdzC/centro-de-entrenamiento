$('body').ready(function(){
  $('#nav').on('click','.cerrarSesion',function(event){
    window.location.href = "/";
  });
}); 