class ArreglaFechas{
  static fechaParaBase(fecha){
    let m = fecha.getMonth()+1;
    let d = fecha.getDate();
    if(fecha.getMonth()+1 < 10){
      m = "0"+m;
    }
    if(fecha.getDate() < 10){
      d = "0"+d;
    }
    return fecha.getFullYear()+"-"+m+"-"+d;
  }

  static baseParaFecha(fecha){
    let fs = fecha.split("-");
    let m = parseInt(fs[1])+1;
    if(m < 10){
      m = "0"+m;
    }
    let f = new Date(fs[0]+"-"+m+"-"+fs[2]);
    return f;
  }
}

module.exports = ArreglaFechas;