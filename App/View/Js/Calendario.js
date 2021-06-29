$('body').ready(async function(){
  var cla = new Clase();
  var servicios = new Servicios();
  var instructores = new Instructores();
  var esModificar = false;
  var modalClase;
  var idClaseJornada;
  let idModalClase = document.getElementById('modalClase');
  if(idModalClase){
    modalClase = new bootstrap.Modal(idModalClase);
  }

  var cal = new Calendario();
  var modalVerDia = new bootstrap.Modal(document.getElementById('modalVerDia'));
  var sa = new Sala();
  var salas = [];
  salas = await sa.mostrarSalasSimple();

  let dUsuario = new Date();
  let mesUsuario = dUsuario.getMonth();
  let annoUsuario = dUsuario.getFullYear();
  let diaActual = dUsuario.getDate();
  let mesActual = mesUsuario;
  let annoActual = annoUsuario;
  var jornadas;
  var jornadaActual;
  var claseActual;

  const meses = Array(
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
    );
  
  construyeCalendario = async function (annoUsuario, mesUsuario, annoActual, mesActual, diaActual){
    $('#calendarioCont').empty();
    $('#mesAnno').empty();
    $('#mesAnno').append(meses[mesUsuario]+" "+annoUsuario);
    if(salas.length > 0){
      try{
        let jornadasDelMes = await cal.mostrarCalendario({idSala:salas[0].id,annoUsuario, mesUsuario, annoActual, mesActual, diaActual});
        jornadas = jornadasDelMes.jornadas;
        $('#calendarioCont').append(jornadasDelMes.html);
        var r = await cal.hayNotificacion();
        if(r.notificacion){
          if($('#notificacion').children().length === 0){
            $('#notificacion').append('<div class="puntoAmarillo"></div>');
          }
        }
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    } else {
      $('#calendarioCont').append('<h2>Nada para mostrar</h2>');
    }
  }

  $('#calendarioCont').on('click', '.diaHabil', async function(){
    let idJornada = $(this).attr('id');
    await muestraClases(idJornada);
  });

  const muestraClases = async function(idJornada){
    try{
      let j = await cal.mostrarClasesJornada({idJornada});
      console.log(j);
      jornadaActual = j.jornada;
      $('#infoDia').empty();
      $('#infoDia').append(j.html);
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  }

  $('#mesAnterior').on('click',function(event){
    mesUsuario-=1;
    if(mesUsuario < 0){
      mesUsuario = 11;
      annoUsuario-=1;
    }
    construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  });

  $('#mesSiguiente').on('click',function(event){
    mesUsuario+=1;
    if(mesUsuario > 11){
      mesUsuario = 0;
      annoUsuario+=1;
    }
    construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  });

  muestraModal = function(){
    let val = $(this).attr('title');
    $('#verDiaModal').empty();
    $('#verDiaModal').append(val);
    modalVerDia.show();
  }

  limpiarModal = function(){
    $('#formClase').removeClass('was-validated');
    $('#capacidad').val("");
    $('#dia').val("");
    $('#horaInicio').val("");
    $('#horaFinal').val("");
    $('#servicio').val("");
    $('#estado').val("");
    $('#instructor').val("");
    $('#instructorTemporal').val("");
    $('#aplicarTodas').prop('checked', false);
  }

  $('#modalClase').on('hidden.bs.modal', async function (e) {
    limpiarModal();
  })

  fechaEnInput = function(a){
    var d;
    if(a != null){
      d = new Date(a);
    } else {
      d = new Date();
    }
    var dia = ("0" + d.getDate()).slice(-2);
    var mes = ("0" + (d.getMonth() + 1)).slice(-2);
    return d.getFullYear()+"-"+mes+"-"+dia;
  }

  $('body').on('click', '.matricular', async function(event){
    idClaseJornada = $(this).attr('value');
    try{
      await cla.matricularClase({idClaseJornada});
      $(this).addClass("desmatricular");
      $(this).addClass("btn-secondary");
      $(this).removeClass("matricular");
      $(this).removeClass("btn-tertiary");
      $(this).empty();
      $(this).append("Desmatricular");
    }catch(err){
      console.log(err);
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('body').on('click', '.desmatricular', async function(event){
    idClaseJornada = $(this).attr('value');
    try{
      await cla.desmatricularClase({idClaseJornada});
      $(this).addClass("matricular");
      $(this).addClass("btn-tertiary");
      $(this).removeClass("desmatricular");
      $(this).removeClass("btn-secondary");
      $(this).empty();
      $(this).append("Matricular");
    }catch(err){
      console.log(err);
      muestraMensaje("Fallo", err.responseText);
    }
  });

  $('#eliminarClase').on('click', async function(event){
    if(esModificar){
      try{
        let val = $(this).val();
        await cla.eliminarClaseEnJornada(val);
        await muestraClases(jornadaActual.id);
        await construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
        modalClase.hide();
      }catch(err){
        console.log(err);
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#eliminarTodasClase').on('click', async function(){
    if(esModificar){
      try{
        let val = $(this).val();
        await cla.eliminar(val);
        await muestraClases(jornadaActual.id);
        await construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
        modalClase.hide();
      }catch(err){
        console.log(err);
        muestraMensaje("Fallo", err.responseText);
      }
    }
  })

  $('body').on('click', '.activaModal', async function(event){
    let val = $(this).attr('value');
    var hoy = fechaEnInput(null);
    if(val == "CREAR"){
      limpiarModal();
      $('#dia').removeAttr('disabled');
      $('#dia').val(hoy);
      $('#dia').attr('min',hoy);
      esModificar = false;
      $('#eliminarTodasClase').addClass("esconde");
      $('#eliminarClase').addClass("esconde");
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Crear clase");
      $('#checkAplicarTodas').addClass('esconde');
      $('#contEstado').addClass('esconde');
      $('#contRepeticion').removeClass('esconde');
      modalClase.show();
    } else {
      limpiarModal();
      esModificar = true;
      $('#eliminarTodasClase').removeClass("esconde");
      $('#eliminarClase').removeClass("esconde");
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Modificar clase");
      $('#contRepeticion').addClass('esconde');
      $('#checkAplicarTodas').removeClass('esconde');
      $('#contEstado').removeClass('esconde');
      try{
        let val2 = val.split("-");
        if(val.length < 2){
          throw {responseText: "Algo salió mal"}
        }
        idClaseJornada = val2[1];
        $('#eliminarTodasClase').val(val2[0]);
        $('#eliminarClase').val(val2[1]);
        claseActual = await cla.mostrarClase(val2[0]);
        console.log(claseActual);
        $('#dia').val(jornadaActual.dia);
        $('#dia').attr('min',hoy);
        $('#dia').prop('disabled', true);
        let hs = claseActual.horarios;
        let hc;
        for(let h of hs){
          hc = claseActual.horarios;
        }
        $("#horaInicio").val(hc.horaInicio+":"+hc.minutoInicio).change();
        $("#horaFinal").val(hc.horaFinal+":"+hc.minutoFinal).change();
        $("#servicio").val(claseActual.servicio).change();
        $("#capacidad").val(claseActual.capacidad);
        $("#instructor").val(claseActual.instructor.email).change();
        $("#estado").val(claseActual.estado).change();
        if(claseActual.instructorTemporal){
          $("#instructorTemporal").val(claseActual.instructorTemporal.email).change();
        }
        modalClase.show();
      }catch(err){
        console.log(err);
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#formClase').submit(async function(event){
    event.preventDefault();
    let form = $('#formClase')[0];
    let info = new FormData(form);
    if(form.checkValidity()){
      try{
        info.set("idSala", salas[0].id);
        info = separarHoraForm(info, "horaInicio", "minutoInicio");
        info = separarHoraForm(info, "horaFinal", "minutoFinal");
        if(parseInt(info.get("horaInicio")) > parseInt(info.get("horaFinal")) || (parseInt(info.get("horaInicio")) === parseInt(info.get("horaFinal")) && parseInt(info.get("minutoInicio")) >= parseInt(info.get("minutoFinal")))){
          throw {responseText:"La hora de inicio debe ser antes que la hora final"}
        }
        if(info.has("instructorTemporal")){
          if(info.get("instructorTemporal") == ""){
            info.delete("instructorTemporal");
          }
        }
        if(esModificar){
          let hc = claseActual.horario[jornadaActual.id];
          info.set("idIntervalo", hc.id);
          info.set("idClase", claseActual.id);
          info.set("dia", jornadaActual.dia);
          await cla.modificarClase(info);
          await muestraClases(jornadaActual.id);
        }
        else{
          await cla.crearClase(info);
          await construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
        }
        modalClase.hide();
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
    form.classList.add('was-validated');
  });

  cargar = async function(){
    try{
      var res = await servicios.mostrarListadoServicios(true);
      if(res){
        $('#servicio').append(res);
      }
      var res2 = await instructores.mostrarListadoInstructores(true);
      if(res2){
        $('#instructor').append(res2);
        $('#instructorTemporal').append(res2);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  cargar();

  $('#calendarioCont').on('click', '.diaVerde',muestraModal);
  $('#calendarioCont').on('click', '.diaBlanco',muestraModal);

  construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  

});
