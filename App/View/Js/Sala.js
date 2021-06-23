$('body').ready(function(){
  var modalCc = new bootstrap.Modal(document.getElementById('modalCrearCalendario'));
  var modalS = new bootstrap.Modal(document.getElementById('modalSala'));
  var sala = new Sala();
  var servicios = new Servicios();
  var esModificar = false;
  var listaServicios = [];
  var calendario = [];
  var listaServiciosE = [];
  var calendarioE = [];
  var listaServiciosA = [];
  var calendarioA = [];
  var salas;
  var salaActual;
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
    try{
      var res = await servicios.mostrarListadoServicios(true);
      if(res){
        $('#annadirServicio').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  const limpiarModal = function(){
    $('#capacidad').val("");
    $('#aforo').val("");
    $('#costo').val("");
    $('#annadirServicio').val("").change();
    $('#serviciosEscogidos').empty();
    $('#listaDiasCalendario').empty();
    listaServicios = [];
    calendario = [];
    listaServiciosE = [];
    calendarioE = [];
    listaServiciosA = [];
    calendarioA = [];
    esModificar = false;
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

  $('#modalSala').on('hidden.bs.modal', function (e) {
    limpiarModal();
  });

  $('body').on('click', '.activaModal', function(event){
    listaServicios = [];
    calendario = [];
    let val = $(this).attr('value');
    if(val == "CREAR"){
      esModificar = false;
      $('#crearEditar').empty();
      $('#crearEditar').append("Crear sala");
    } else {
      salaActual = val;
      $('#capacidad').val(salas[salaActual].capacidad);
      $('#aforo').val(salas[salaActual].aforo);
      $('#costo').val(salas[salaActual].costoMatricula);
      for(let s of salas[salaActual].servicios){
        insertaServicioHtml(s);
      }
      calendario = salas[salaActual].calendario;
      for(let c of calendario){
        let d = new Date(c.dia);
        let ha = c.horarioAtencion;
        let mes = d.getMonth()+1;
        let dia = d.getDate();
        if(mes < 10){
          mes = "0"+mes;
        }
        if(dia < 10){
          dia = "0"+dia;
        }
        let e = `<a class="fechaCalendario link" title="`+dia+`/`+mes+`/`+d.getFullYear()+`" id="`+c.id+`_`+ha.id+`">`+dia+`/`+mes+`/`+d.getFullYear()+`, `+ha.horaMinutosInicio+`-`+ha.horaMinutosFinal+` </a>`;
        $('#listaDiasCalendario').append(e);
      }
      esModificar = true;
      $('#crearEditar').empty();
      $('#crearEditar').append("Modificar sala");
    }
  });
  
  $('#formSala').submit(async function(event){
    event.preventDefault();
    let form = $('#formSala')[0];
    let pasa = listaServicios.length > 0 && (listaServicios.length > listaServiciosE.length || listaServiciosA.length > 0);
    let pasa2 = calendario.length > 0 && (calendario.length > calendarioE.length || calendarioA.length > 0);
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
          info.append("idSala", salas[salaActual].id);
          r = await sala.modificarSala(info, listaServiciosE, listaServiciosA, calendarioE, calendarioA);
        }else{
          r = await sala.crearSala(info, listaServicios, calendario);
        }
        cargarSalas();
        modalS.hide();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    } else {
      muestraMensaje("Fallo", errorM);
    }
  });

  cargarSalas = async function(){
    try{
      var res = await sala.mostrarSalas();
      if(res){
        salas = res.salas;
        $('#salas').empty();
        $('#salas').append(res.html);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  $('#formSala').on('click', '.servicio', function(){
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

  $('#formSala').on('click', '.fechaCalendario', function(event){
    let i = $(this).attr('id');
    if(esModificar){
      if(i[0] == "A"){
        i = i.substring(1);
        if (parseInt(i) > -1) {
          calendarioA.splice(i, 1);
          $(this).remove();
        }
      }else{
        let v = i.split("_");
        if(v.length == 2){
          calendarioE.push({idJornada:v[0],idIntervaloTiempo:v[1]});
          $(this).remove();
        }
      }
    } else {
      if (parseInt(i) > -1) {
        calendario.splice(i, 1);
        $(this).remove();
      }
    }
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
      var hi = info.get("horaInicio");
      var mi = info.get("minutoInicio");
      var hf = info.get("horaFinal");
      var mf = info.get("minutoFinal");
      var mDia;
      var mDia2;
      if(hi == 12){
        mDia = "md";
      } else if(hi < 12) {
        mDia = "am";
      } else {
        hi = hi-12;
        mDia = "pm";
      }
      if(hf == 12){
        mDia2 = "md";
      } else if(hf < 12) {
        mDia2 = "am";
      } else {
        hf = hf-12;
        mDia2 = "pm";
      }
      if(hi < 10){
        hi = "0"+hi;
      }
      if(mi < 10){
        mi = "0"+mi;
      }
      if(hf < 10){
        hf = "0"+hf;
      }
      if(mf < 10){
        mf = "0"+mf;
      }
      if(rep == "CADASEMANADELMES"){
        if(esModificar){
          e = `<a class="fechaCalendario link" id="A`+ultimo+`" `;
        }else{
          e = `<a class="fechaCalendario link" id="`+ultimo+`" `;
        }
        e += `title="Cada `+dias[d.getDay()]+`, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+`">Cada `+dias[d.getDay()]+`, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+` </a>`;
      } else if(rep == "TODOSLOSDIASDELMES"){
        if(esModificar){
          e = `<a class="fechaCalendario link" id="A`+ultimo+`" `;
        }else{
          e = `<a class="fechaCalendario link" id="`+ultimo+`" `;
        }
        e += `title="Todos los días del mes, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+`">Todos los días del mes, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+`</a>`;
      } else if(rep == "NOSEREPITE"){
        if(esModificar){
          e = `<a class="fechaCalendario link" id="A`+ultimo+`" `;
        }else{
          e = `<a class="fechaCalendario link" id="`+ultimo+`" `;
        }
        e += `title="`+info.get("dia")+`, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+`">`+info.get("dia")+`, `+hi+`:`+mi+mDia+`-`+hf+`:`+mf+mDia2+`</a>`;
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