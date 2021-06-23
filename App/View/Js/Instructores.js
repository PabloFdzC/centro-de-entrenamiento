$('body').ready(function(){
  var instructores = new Instructores();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];
  var listaServiciosA = [];
  var listaServiciosE = [];
  var modalCrearEditar = new bootstrap.Modal(document.getElementById('modalCrearEditar'));

  const cargarServicios = async function(){
    try{
      var res = await servicios.mostrarListadoServicios(true);
      if(res){
        $('#annadirServicio').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  const cargarInstructores = async function(){
    try{
      var res = await instructores.mostrarListadoInstructores(false);
      if(res){
        $('#instructores').empty();
        $('#instructores').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  const insertaServicioHtml = function(val){
    if(val != "" && !listaServiciosA.includes(val) && !listaServicios.includes(val)){
      if(esModificar){
        listaServiciosA.push(val);
      }else{
        listaServicios.push(val);
      }
      $('#serviciosEscogidos').append(`
      <div class="servicio ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`" id="`+val+`">
        `+val+`
      </div>`);
    }
  };

  const limpiarModal = function(){
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
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar instructor");
      let instr = await instructores.mostrarInstructor(val);
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
        esModificar = true;
      }
      
    }
  });

  $('body').on('click', '.eliminarInstructor', async function(event){
    let val = $(this).attr('value');
    try{
      let r = await instructores.eliminarInstructor(val);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('#modalCrearEditar').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });

  $('#formInstructor').submit(async function(event){
    event.preventDefault();
    let form = $('#formInstructor')[0];
    let pasa = listaServicios.length > 0 && (listaServicios.length > listaServiciosE.length || listaServiciosA.length > 0);
    if(!pasa){
      muestraMensaje("Fallo", "Debe haber por lo menos 1 servicio");
    }
    if(form.checkValidity() && pasa){
      let info = new FormData(form);
      var r;
      try{
        if(esModificar)
          r = await instructores.modificarInstructor(info, listaServiciosA, listaServiciosE);
        else{
          r = await instructores.crearInstructor(info, listaServicios);
        }
        cargarInstructores();
        modalCrearEditar.hide();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#formInstructor').on('click', '.servicio', function(){
    let val = $(this).attr('id');
    if(esModificar){
      if(listaServiciosE.length+1 === listaServicios.length && listaServiciosA.length === 0){
        muestraMensaje('Fallo', 'Debe existir al menos 1 servicio');
      }else{
        listaServiciosE.push(val);
        $(this).remove();
      }
    } else {
      let i = listaServicios.indexOf(val);
      if (i > -1) {
        listaServicios.splice(i, 1);
        $(this).remove();
      }
    }
  });

  $('#annadeServicio').on('click', function(event){
    let val = $('#annadirServicio').children("option:selected").val();
    insertaServicioHtml(val);
  });

  cargarServicios();
  cargarInstructores();
});