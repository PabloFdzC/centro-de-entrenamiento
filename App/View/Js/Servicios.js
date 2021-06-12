$('body').ready(function(){
  var servicios = new Servicios();
  var esModificar = false;
  var servicioActual = "";
  var modal = new bootstrap.Modal(document.getElementById('modalServicio'));
  $('#costo').prop('disabled', true);

  cargar = async function(){
    var res = await servicios.mostrarListadoServicios(false);
    if(res){
      $('#servicios').empty();
      $('#servicios').append(res);
    }
  };

  $('body').on('click', '.activaModal', function(event){
    servicioActual = $(this).attr('value');
    if(servicioActual == "CREAR"){
      esModificar = false;
      $('#crearEditar').empty();
      $('#crearEditar').append("Crear servicio");
    } else {
      esModificar = true;
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar servicio");
    }
  });

  $('#costoServicio').change(function(){
    if(this.checked) {
      $('#costo').prop('disabled', true);
    } else {
      $('#costo').removeAttr('disabled');
    }
  });
  
  $('#formServicio').submit(function(event){
    event.preventDefault();
    let form = $('#formServicio')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      //console.log(Array.from(info));
      if(esModificar){
        servicios.modificarServicio(info);
      }
      else {
        servicios.crearServicio(info);
      }
      modal.hide();
    }
  });

  cargar();

});