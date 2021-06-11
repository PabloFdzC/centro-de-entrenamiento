$('body').ready(function(){
  var instructores = new Instructores();
  var esModificar = false;

  $('body').on('click', '.activaModal', function(event){
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

});