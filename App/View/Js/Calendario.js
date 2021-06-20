$('body').ready(async function(){
  var cla = new Clase();
  var servicios = new Servicios();
  var esModificar = false;
  var cargado = false;
  var modalClase = new bootstrap.Modal(document.getElementById('modalClase'));

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
      let jornadasDelMes = await cal.mostrarCalendario({idSala:salas[0].id,annoUsuario, mesUsuario, annoActual, mesActual, diaActual});
      jornadas = jornadasDelMes.jornadas;
      $('#calendarioCont').append(jornadasDelMes.html);
    } else {
      $('#calendarioCont').append('<h2>Nada para mostrar</h2>');
    }
  }

  $('#calendarioCont').on('click', '.diaHabil', async function(){
    let idJornada = $(this).attr('id');
    let j = await cal.mostrarClasesJornada({idJornada});
    console.log(j);
    jornadaActual = j.jornada;
    $('#infoDia').empty();
    $('#infoDia').append(j.html);
  });

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

  $('body').on('click', '.activaModal', async function(event){
    let val = $(this).attr('value');
    var hoy = fechaEnInput(null);
    if(val == "CREAR"){
      $('#dia').val(hoy);
      $('#dia').attr('min',hoy);
      esModificar = false;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Crear clase");
      $('#checkAplicarTodas').addClass('esconde');
      $('#contRepeticion').removeClass('esconde');
      modalClase.show();
    } else {
      esModificar = true;
      $('#crearEditarModal').empty();
      $('#crearEditarModal').append("Modificar clase");
      $('#contRepeticion').addClass('esconde');
      $('#checkAplicarTodas').removeClass('esconde');
      try{
        claseActual = await cla.mostrarClase(val);
        let ja = fechaEnInput(jornadaActual.dia);
        console.log(jornadaActual);
        console.log(ja);
        $('#dia').val(ja);
        $('#dia').attr('min',hoy);
        console.log(claseActual);
        let hc = claseActual.horarioClase[0];
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
      }catch(e){
        console.log(e);
      }
    }
  });

  $('#formClase').submit(async function(event){
    event.preventDefault();
    let form = $('#formClase')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      info.set("idSala", salas[0].id);
      info = separarHoraForm(info, "horaInicio", "minutoInicio");
      info = separarHoraForm(info, "horaFinal", "minutoFinal");
      try{
        if(esModificar)
          await cla.modificarClase(info);
        else
          await cla.crearClase(info);
        modalClase.hide();
      }catch(e){
        console.log(e);
      }
    }
  });

  cargar = async function(){
    var res = await servicios.mostrarListadoServicios(true);
    if(res){
      $('#servicio').append(res);
    }
  };

  cargar();

  $('#calendarioCont').on('click', '.diaVerde',muestraModal);
  $('#calendarioCont').on('click', '.diaBlanco',muestraModal);

  construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  

});
