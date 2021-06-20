$('body').ready(function(){
  var modalCc = new bootstrap.Modal(document.getElementById('modalCrearCalendario'));
  var modalCs = new bootstrap.Modal(document.getElementById('modalCrearSala'));
  var sala = new Sala();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];
  var calendario = [];
  var listaServiciosE = [];
  var calendarioE = [];
  var listaServiciosA = [];
  var calendarioA = [];
  const dias = Array(
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
    );

  const cargar = async function(){
    var res = await servicios.mostrarListadoServicios(true);
    if(res){
      $('#annadirServicio').append(res);
    }
  };

  const insertaServicioHtml = function(val){
    if(val != ""){
      if(esModificar){
        listaServiciosA.push(val);
      }else{
        listaServicios.push(val);
      }
      $('#serviciosEscogidos').append(`
      <div class="servicio ps-3 pe-3 pt-2 pb-2 text-center m-1" title="`+val+`">
        `+val+`
      </div>`);
    }
  };

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
  
  $('#formSala').submit(async function(event){
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
      let r;
      try{
        if(esModificar){
          r = await sala.modificarSala(info, listaServiciosE, listaServiciosA, calendarioE, calendarioA);
        }else{
          r = await sala.crearSala(info, listaServicios, calendario);
        }
        cargarSalas();
        modalCs.hide();
      }catch(err){
        
      }
    } else {
      muestraMensaje("Fallo", errorM);
    }
  });

  cargarSalas = async function(){
    var res = await sala.mostrarSalas();
    if(res){
      $('#salas').empty();
      $('#salas').append(res);
    }
  };

  $('#formSala').on('click', '.servicio', function(){
    let val = $(this).attr('title');
    if(esModificar){
      listaServiciosE.push(val);
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

  $('#formSala').on('click', '.fechaCalendario', function(event){
    let i = $(this).attr('title');
    if(esModificar){
      if(i[0] == "A"){
        if (parseInt(i[1]) > -1) {
          calendarioA.splice(i[1], 1);
        }
      }else{
        calendarioE.push(i);
      }
    } else {
      if (parseInt(i) > -1) {
        calendario.splice(i, 1);
      }
    }
    $(this).remove();
  });

  $('#formCrearCalendario').submit(function(event){
    event.preventDefault();
    let form = $('#formCrearCalendario')[0];
    if(form.checkValidity()){
      let ultimo;
      let info = new FormData(form);
      info = separarHoraForm(info, "horaInicio", "minutoInicio");
      info = separarHoraForm(info, "horaFinal", "minutoFinal");
      if(esModificar){
        ultimo = calendarioA.length;
        calendarioA.push(Utilidades.convertirAJSON(info));
      } else {
        ultimo = calendario.length;
        calendario.push(Utilidades.convertirAJSON(info));
      }
      var rep = info.get("repeticion");
      var e;
      var d = new Date(info.get("dia"));
      if(rep == "CADASEMANADELMES"){
        if(esModificar){
          e = `<a class="fechaCalendario link" title="A`+ultimo+`">Cada `+dias[d.getDay()]+`, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }else{
          e = `<a class="fechaCalendario link" title="`+ultimo+`">Cada `+dias[d.getDay()]+`, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }
      } else if(rep == "TODOSLOSDIASDELMES"){
        if(esModificar){
          e = `<a class="fechaCalendario link" title="A`+ultimo+`">Todos los días del mes, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }else{
          e = `<a class="fechaCalendario link" title="`+ultimo+`">Todos los días del mes, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }
      } else if(rep == "NOSEREPITE"){
        if(esModificar){
          e = `<a class="fechaCalendario link" title="A`+ultimo+`">`+info.get("dia")+`, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }else{
          e = `<a class="fechaCalendario link" title="`+ultimo+`">`+info.get("dia")+`, `+info.get("horaInicio")+`:`+info.get("minutoInicio")+`-`+info.get("horaFinal")+`:`+info.get("minutoFinal")+` </a>`;
        }
      }
      
      $('#listaDiasCalendario').append(e);
      modalCc.hide();
    }
  });

  $('#annadirCalendario').on('click',function(event){
    $('#dia').val("");
    $('#horaInicio').val("");
    $('#horaFinal').val("");
    $('#repeticion').val("");
  });

  cargar();
  cargarSalas();
});