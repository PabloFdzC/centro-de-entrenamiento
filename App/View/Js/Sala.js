$('body').ready(function(){
  var sala = new Sala();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];
  var calendario = [];

  cargar = async function(){
    var res = await servicios.mostrarListadoServicios(true);
    if(res){
      $('#annadirServicio').append(res);
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
  }

  $('body').on('click', '.activaModal', function(event){
    listaServicios = [];
    calendario = [];
    if($(this).attr('value') == "CREAR"){
      esModificar = false;
      $('#crearEditar').empty();
      $('#crearEditar').append("Crear sala");
    } else {
      esModificar = true;
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar sala");
    }
  });
  
  $('#formSala').submit(function(event){
    event.preventDefault();
    let form = $('#formSala')[0];
    let pasa = listaServicios.length > 0;
    let pasa2 = calendario.length > 0;
    let errorM = "";
    if(!pasa){
      errorM += "Se necesita por lo menos 1 servicio.";
    }
    if(!pasa2){
      errorM += "Se necesita por lo menos 1 fecha en el calendario.";
    }
    if(form.checkValidity() && pasa && pasa2){
      let info = new FormData(form);
      if(esModificar)
        sala.modificarSala(info, listaServicios, calendario);
      else
        sala.crearSala(info, listaServicios, calendario);
    } else {
      muestraMensaje("Fallo", errorM);
    }
  });

  var res = sala.mostrarSalas();
  if(res){
    $('#salas').append(res);
  }

  $('#formSala').on('click', '.servicio', function(event){
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

  cargar();
});