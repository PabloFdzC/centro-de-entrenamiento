$('body').ready(function(){
  var servicios = new Servicios();
  var esModificar = false;
  var servicioActual = "";
  var listaServicios = [];
  var modal = new bootstrap.Modal(document.getElementById('modalServicio'));

  $('#costoServicio').change(function(){
    if(this.checked) {
      $('#costo').val("");
      $('#costo').prop('disabled', true);
    } else {
      $('#costo').removeAttr('disabled');
    }
  });

  const limpiarModal = function(){
    $('#nombre').val("");
    $('#costo').val("");
    $('#costoServicio').prop('checked', true);
    esModificar = false;
  };

  cargar = async function(){
    try{
      var res = await servicios.mostrarListadoServicios(false);
      if(res){
        $('#servicios').empty();
        $('#servicios').append(res.html);
        listaServicios = res.servicios;
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('body').on('click', '.activaModal', function(event){
    $('#costoServicio').prop('checked', true);
    $('#costo').prop('disabled', true);
    servicioActual = $(this).attr('value');
    if(servicioActual == "CREAR"){
      esModificar = false;
      $('#crearEditar').empty();
      $('#crearEditar').append("Crear servicio");
    } else {
      esModificar = true;
      servicioActual = parseInt(servicioActual);
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar servicio");
      $('#nombre').val(listaServicios[servicioActual].nombre);
      if(listaServicios[servicioActual].costoMatricula){
        $('#costoServicio').prop('checked', false);
        $('#costo').removeAttr('disabled');
        $('#costo').val(listaServicios[servicioActual].costoMatricula);
      }
    }
  });

  $('body').on('click', '.eliminaServicio', async function(event){
    let val = $(this).attr('value');
    try{
      let r = await servicios.eliminarServicio(val);
      if(r){
        const card = $(this).parent().parent().parent().parent().parent().parent();
        card.remove();
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  });
  
  $('#formServicio').submit(async function(event){
    event.preventDefault();
    let form = $('#formServicio')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      let r;
      try{
        if(esModificar){
          r = await servicios.modificarServicio(info);
        }else {
          r = await servicios.crearServicio(info);
        }
        modal.hide();
        cargar();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#modalServicio').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });

  cargar();

});