$('body').ready(function(){
  var cec = new CrearEditarClase();
  var servicios = new Servicios();
  var esModificar = false;
  var modal = new bootstrap.Modal(document.getElementById('modalClase'));

  $('body').on('click', '.activaModal', function(event){
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Crear clase");
    } else if($(this).attr('value') == "MODIFICAR"){
      esModificar = true;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Modificar clase");
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

  cargar = async function(){
    var res = await servicios.mostrarListadoServicios(true);
    if(res){
      $('#servicio').append(res);
    }
  };

  cargar();

});