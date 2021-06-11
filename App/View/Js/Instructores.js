$('body').ready(function(){
  var instructores = new Instructores();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];

  var res = servicios.mostrarListadoServicios(true);
  if(res){
    $('#annadirServicio').append(res);
  }

  insertaServicioHtml = function(val){
    if(val != ""){
      listaServicios.push(val);
      $('#serviciosEscogidos').append(`
      <div class="servicio ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`">
        `+val+`
      </div>`);
    }
  }

  $('body').on('click', '.activaModal', function(event){
    listaServicios = [];
    var val = $(this).attr('value');
    if(val == "CREAR"){
      esModificar = false;
    } else {
      esModificar = true;
      let instr = instructores.mostrarInstructor(val);
      $('#primerNombre').val(instr.getPrimerNombre());
      $('#segundoNombre').val(instr.getSegundoNombre());
      $('#primerApellido').val(instr.getPrimerApellido());
      $('#segundoApellido').val(instr.getSegundoApellido());
      $('#identificacion').val(instr.getIdentificacion());
      $('#fechaNacimiento').val(instr.getFechaNacimiento());
      $('#telefono').val(instr.getTelefono());
      $('#email').val(instr.getEmail());
      //servicios
    }
  });

  $('body').on('click', '.eliminarInstructor', function(event){
    let val = $(this).attr('value');
    if(instructores.eliminarInstructor(val)){
      const card = $(this).parent().parent().parent().parent().parent().parent();
      card.remove();
    }
  });

  $('#formInstructor').submit(function(event){
    event.preventDefault();
    let form = $('#formInstructor')[0];
    let info = new FormData(form);
    if(esModificar)
      instructores.modificarInstructor(info);
    else
      instructores.crearInstructor(info);
  });

  $('#formInstructor').on('click', '.servicio', function(event){
    let val = $(this).attr('title');
    let i = listaServicios.indexOf(val);
    if (i > -1) {
      array.splice(i, 1);
      $(this).remove();
    }
  });

  $('#annadeServicio').on('click', function(event){
    let val = $('#annadirServicio').children("option:selected").val();
    insertaServicioHtml(val);
  });

});