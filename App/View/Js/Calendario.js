$('body').ready(function(){
  var cal = new Calendario();

  let dUsuario = new Date();
  let mesUsuario = dUsuario.getMonth();

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
  
  construyeCalendario = function (){
    let cuadrosDias = ``;
    let d = new Date();
    let diaActual = d.getDay();
    let diaNActual = d.getDate();
    let mesActual = d.getMonth();
    let annoActual = d.getFullYear();
    let diasSemana = `
    <div class="row mt-2 justify-content-center">
    `;
    for(let i = 0; i < 5; i++){
      cuadrosDias += `
        <div class="row mt-2 justify-content-center">
      `;
      for(let j = 0; j < 7; j++){
        cuadrosDias+= `
          <div class="col">
            <div class="card diaBlanco">
              <div class="card-body" style="padding-left: 0;padding-right: 0;">
                <div class="container">
                  <h5 class="card-title tituloDia" id="`+(i+j)+`">`+(i+j+1)+`</h5>
                  <div class="row rowDia">
                    <div class="punto"></div>
                    <div class="clasesCalendarioDia">2 clases</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      cuadrosDias += `
        </div>
      `;
    }
    for(let i = 0; i < 7; i++){
      diasSemana += `
      <div class="col">`+dias[i]+`</div>
      `;
    }
    diasSemana += `
      </div>
    `;
    $('#calendarioCont').append(diasSemana);
    $('#calendarioCont').append(cuadrosDias);
  }

  construyeCalendario();
  //cal.mostrarClasesPorMes();
  //cal.mostrarListadoReservas();
  //cal.mostrarClase();
});
