$('body').ready(function(){
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
    let html = ``;
    var d = new Date();
    var n = d.getDate();
    for(let i = 0; i < 5; i++){
      html += `
        <div class="row mt-2 justify-content-center">
      `;
      for(let j = 0; j < 7; j++){
        html+= `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" id="`+(i+1)+``+(j+1)+`">`+(i+j+1)+`</h5>
              </div>
            </div>
          </div>
        `;
        $('#calendarioCont').append();
      }
      html += `
        </div>
      `;
    }
    $('#calendarioCont').append(html);
  }

  construyeCalendario();
});
