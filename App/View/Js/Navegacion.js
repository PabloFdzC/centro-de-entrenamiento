$('body').ready(function(){
  $('#nav').on('click','.cerrarSesion',function(event){
    localStorage.clear();
    window.location.href = "/";
  });
}); 