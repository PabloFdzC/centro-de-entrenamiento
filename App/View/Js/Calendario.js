$('body').ready(function(){
  var cal = new Calendario();
  var modalVerDia = new bootstrap.Modal(document.getElementById('modalVerDia'));

  let dUsuario = new Date();
  let mesUsuario = dUsuario.getMonth();
  let annoUsuario = dUsuario.getFullYear();
  let diaActual = dUsuario.getDate();
  let mesActual = mesUsuario;
  let annoActual = annoUsuario;

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

  const dias = Array(
    "Lun",
    "Mar",
    "Mie",
    "Jue",
    "Vie",
    "Sab",
    "Dom",
    );
  
  construyeCalendario = async function (annoUsuario, mesUsuario, annoActual, mesActual, diaActual){
    $('#calendarioCont').empty();
    $('#mesAnno').empty();
    $('#mesAnno').append(meses[mesUsuario]+" "+annoUsuario);
    let jornadasDelMes = await cal.mostrarJornadasDelMesI({annoUsuario, mesUsuario, annoActual, mesActual, diaActual});
    $('#calendarioCont').append(jornadasDelMes);
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


  $('#calendarioCont').on('click', '.diaVerde',function(){
    let val = $(this).attr('title');
    $('#verDiaModal').empty();
    $('#verDiaModal').append(val);
    modalVerDia.show();
  });
  $('#calendarioCont').on('click', '.diaBlanco',function(){
    let val = $(this).attr('title');
    $('#verDiaModal').empty();
    $('#verDiaModal').append(val);
    modalVerDia.show();
  });

  construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  //cal.mostrarListadoReservas();
  //cal.mostrarClase();
});
