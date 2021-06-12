$('body').ready(function(){
  var cec = new CrearEditarClase();
  var servicios = new Servicios();
  var esModificar = false;
  var modal = new bootstrap.Modal(document.getElementById('modalClase'));

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
    if(form.checkValidity()){
      let info = new FormData(form);
      if(esModificar)
        cec.modificarClase(info);
      else
        cec.crearClase(info);
      modal.hide();
    }
  });

  $('#servicio').ready(async function(){
    var servs = await servicios.mostrarListadoServicios(true);
    for(let s in servs){
      $(this).append(`
      <option value="`+s.getNombre()+`">`+s.getNombre()+`</option>
      `);
    }
  });


});