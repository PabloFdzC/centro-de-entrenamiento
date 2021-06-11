$('body').ready(function(){
  var cec = new CrearEditarClase();
  var servicios = new Servicios();
  var esModificar = false;

  $('body').on('click', '.activaModal', function(event){
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
    } else if($(this).attr('value') == "MODIFICAR"){
      esModificar = true;
    }
  });

  $('#formClase').submit(function(event){
    event.preventDefault();
    let form = $('#formClase')[0];
    let info = new FormData(form);
    if(esModificar)
      cec.modificarClase(info);
    else
      cec.crearClase(info);
  });

  $('#servicio').ready(function(){
    var servs = servicios.mostrarListadoServicios(true);
    for(let s in servs){
      $(this).append(`
      <option value="`+s.getNombre()+`">`+s.getNombre()+`</option>
      `);
    }
  });


});