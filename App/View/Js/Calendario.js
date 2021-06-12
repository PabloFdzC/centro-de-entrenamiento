$('body').ready(function(){
  var cal = new Calendario();

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
    let jornadasDelMes = await cal.mostrarJornadasDelMes(mesUsuario);
    for(let jdm of jornadasDelMes){
      console.log(jdm.getDia());
    }
    $('#calendarioCont').empty();
    $('#mesAnno').empty();
    $('#mesAnno').append(meses[mesUsuario]+" "+annoUsuario);
    let cuadrosDias = ``;
    let d = new Date(annoUsuario, mesUsuario, 1);
    let empiezaEn = d.getDay();
    let dAnt = new Date(annoUsuario, mesUsuario, 0);
    let antTerminaEn = dAnt.getDate();
    let dDesp 
    if(mesUsuario+1 > 11)
      dDesp = new Date(annoUsuario, 0, 0);
    else
      dDesp = new Date(annoUsuario, mesUsuario+1, 0);
    let actTerminaEn = dDesp.getDate();
    let contar = antTerminaEn - empiezaEn;
    let habil = false;

    let diasSemana = `
    <div class="row mt-2 justify-content-center">
    `;
    for(let i = 0; i < 5; i++){
      cuadrosDias += `
        <div class="row mt-2 justify-content-center">
      `;
      for(let j = 0; j < 7; j++){
        if(contar > antTerminaEn && !habil){
          habil = true;
          contar = 1;
        } else if(contar > actTerminaEn && habil){
          habil = false;
          contar = 1;
          antTerminaEn = 32;
        }
        cuadrosDias+= `
          <div class="col">
            `;
        if(habil){
          if(annoUsuario === annoActual && mesUsuario === mesActual && contar === diaActual){
            cuadrosDias+= `
              <div class="card diaVerde cardDia">
                  <div class="card-body" style="padding-left: 0;padding-right: 0;">
                    <div class="container">
                      <h5 class="card-title tituloDia">`+contar+`</h5>
                      <div class="row rowDia" id="`+contar+`">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
          } else {
            cuadrosDias+= `
              <div class="card diaBlanco cardDia">
                  <div class="card-body" style="padding-left: 0;padding-right: 0;">
                    <div class="container">
                      <h5 class="card-title tituloDia">`+contar+`</h5>
                      <div class="row rowDia" id="`+contar+`">
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
          }
        } else {
          cuadrosDias+= `
            <div class="card diaAmarillo cardDia">
              <div class="card-body" style="padding-left: 0;padding-right: 0;">
                <div class="container">
                  <h5 class="card-title tituloDia">`+contar+`</h5>
                  <div class="row rowDia">
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        }
        contar++;
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
    return actTerminaEn;
  }

  $('#mesAnterior').on('click',function(event){
    mesUsuario-=1;
    if(mesUsuario < 0){
      mesUsuario = 11;
      annoUsuario-=1;
    }
    total = construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  });

  $('#mesSiguiente').on('click',function(event){
    mesUsuario+=1;
    if(mesUsuario > 11){
      mesUsuario = 0;
      annoUsuario+=1;
    }
    total = construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  });

  total = construyeCalendario(annoUsuario, mesUsuario, annoActual, mesActual, diaActual);
  //cal.mostrarListadoReservas();
  //cal.mostrarClase();
});
