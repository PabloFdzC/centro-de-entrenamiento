$('body').ready(function(){
  var sala = new Sala();
  var esModificar = false;

  $('body').on('click', '.activaModal', function(event){
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
    } else if($(this).attr('value') == "MODIFICAR"){
      esModificar = true;
    }
  });
  
  $('#formSala').submit(function(event){
    event.preventDefault();
    let form = $('#formSala')[0];
    let info = new FormData(form);
    if(esModificar)
      sala.modificarSala(info);
    else
      sala.crearSala(info);
  });

});