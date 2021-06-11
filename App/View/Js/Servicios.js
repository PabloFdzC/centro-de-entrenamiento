$('body').ready(function(){
  var servicios = new Servicios();
  var esModificar = false;
  $('#costo').attr({'disabled': 'disabled'});

  cargar = function(){
    var res = servicios.mostrarListadoServicios(false);
    if(res){
      $('#servicios').empty();
      $('#servicios').append(res);
    }
  }

  $('body').on('click', '.activaModal', function(event){
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
    } else {
      esModificar = true;
    }
  });

  $('#costoServicio').change(function(){
    if(this.checked) {
      $('#costo').attr({'disabled': 'disabled'});
    } else {
      $('#costo').attr({'disabled': 'disabled'});
    }
  });
  
  $('#formServicio').submit(function(event){
    event.preventDefault();
    let form = $('#formServicio')[0];
    let info = new FormData(form);
    if(esModificar)
      servicios.modificarServicio(info);
    else
      servicios.crearServicio(info);
  });

  cargar();

});