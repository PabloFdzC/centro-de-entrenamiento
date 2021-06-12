$('body').ready(function(){
  var cec = new CrearEditarClase();
  var servicios = new Servicios();
  var esModificar = false;
  var modal = new bootstrap.Modal(document.getElementById('modalClase'));

  limpiarModal = function(){
    $('#capacidad').val("");
    $('#dia').val("");
    $('#horaInicio').val("");
    $('#horaFinal').val("");
    $('#servicio').val("");
    $('#repeticion').val("");
    $('#estado').val("");
    $('#instructor').val("");
    $('#instructorTemporal').val("");
    $('#aplicarTodas').val("");
  }

  $('#modalClase').on('hidden.bs.modal', function (e) {
    limpiarModal();
  })

  $('body').on('click', '.activaModal', function(event){
    var tipo = localStorage.getItem("tipo");
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Crear clase");
      if(tipo == "Instructor"){
        $('#checkAplicarTodas').addClass('esconde');
        $('#contRepeticion').removeClass('esconde');
      }
    } else {
      esModificar = true;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Modificar clase");
      if(tipo == "Instructor"){
        $('#contRepeticion').addClass('esconde');
        $('#checkAplicarTodas').removeClass('esconde');
      }
    }
    modal.show();
  });

  $('#formClase').submit(function(event){
    event.preventDefault();
    let form = $('#formClase')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      let s = info.get("horaInicio").split(":");
      info.delete("horaInicio");
      info.set("horaInicio", s[0]);
      info.set("minutoInicio", s[1]);
      s = info.get("horaFinal").split(":");
      info.delete("horaFinal");
      info.set("horaFinal", s[0]);
      info.set("minutoFinal", s[1]);
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