$('body').ready(function(){
  var instructores = new Instructores();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];
  var modalCrearEditar = new bootstrap.Modal(document.getElementById('modalCrearEditar'));

  cargarServicios = async function(){
    var res = await servicios.mostrarListadoServicios(true);
    if(res){
      $('#annadirServicio').append(res);
    }
  };

  cargarInstructores = async function(){
    var res = await instructores.mostrarListadoInstructores(false);
    if(res){
      $('#instructores').empty();
      $('#instructores').append(res);
    }
  };

  insertaServicioHtml = function(val){
    if(val != ""){
      listaServicios.push(val);
      $('#serviciosEscogidos').append(`
      <div class="servicio ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`">
        `+val+`
      </div>`);
    }
  };

  limpiarModal = function(){
    $('#primerNombre').val("");
    $('#segundoNombre').val("");
    $('#primerApellido').val("");
    $('#segundoApellido').val("");
    $('#identificacion').val("");
    $('#fechaNacimiento').val("");
    $('#telefono').val("");
    $('#email').val("");
    $('#annadirServicio').val("");
    $('#serviciosEscogidos').empty();
    listaServicios = [];
  };

  $('body').on('click', '.activaModal', async function(event){
    listaServicios = [];
    var val = $(this).attr('value');
    if(val == "CREAR"){
      esModificar = false;
      $('#crearEditar').empty();
      $('#crearEditar').append("Crear instructor");
    } else {
      esModificar = true;
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar instructor");
      let instr = await instructores.mostrarInstructor(val);
      instr = JSON.parse(instr);
      console.log(instr);
      if(instr){
        $('#primerNombre').val(instr.primerNombre);
        $('#segundoNombre').val(instr.segundoNombre);
        $('#primerApellido').val(instr.primerApellido);
        $('#segundoApellido').val(instr.segundoApellido);
        $('#identificacion').val(instr.identificacion);
        $('#fechaNacimiento').val(instr.fechaNacimiento);
        $('#telefono').val(instr.telefono);
        $('#email').val(instr.email);
        for(let s of instr.servicios){
          insertaServicioHtml(s);
        }
      }
      
    }
  });

  $('body').on('click', '.eliminarInstructor', async function(event){
    let val = $(this).attr('value');
    let r = await instructores.eliminarInstructor(val);
    if(r){
      const card = $(this).parent().parent().parent().parent().parent().parent();
      card.remove();
    }
  });

  $('#modalCrearEditar').on('hidden.bs.modal', function (e) {
    limpiarModal();
  })

  $('#formInstructor').submit(function(event){
    event.preventDefault();
    let form = $('#formInstructor')[0];
    let pasa = listaServicios.length > 0;
    if(!pasa){
      muestraMensaje("Fallo", "Debe haber por lo menos 1 servicio");
    }
    if(form.checkValidity() && pasa){
      let info = new FormData(form);
      if(esModificar)
        instructores.modificarInstructor(info, listaServicios);
      else{
        instructores.crearInstructor(info, listaServicios);
        cargarInstructores();
      }
      modalCrearEditar.hide();
    }
  });

  $('#formInstructor').on('click', '.servicio', function(event){
    let val = $(this).attr('title');
    let i = listaServicios.indexOf(val);
    if (i > -1) {
      listaServicios.splice(i, 1);
      $(this).remove();
    }
  });

  $('#annadeServicio').on('click', function(event){
    let val = $('#annadirServicio').children("option:selected").val();
    insertaServicioHtml(val);
  });

  cargarServicios();
  cargarInstructores();
});