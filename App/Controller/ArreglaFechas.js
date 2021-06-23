class ArreglaFechas{
  static fechaAString(fecha){
    if(fecha == null){
      fecha = new Date();
    }
    let m = fecha.getMonth()+1;
    let d = fecha.getDate();
    if(m < 10){
      m = "0"+m;
    }
    if(fecha.getDate() < 10){
      d = "0"+d;
    }
    return fecha.getFullYear()+"-"+m+"-"+d;
  }

  static stringAFecha(fecha){
    let f = new Date();
    if(fecha != null && fecha != ""){
      let fs = fecha.split("-");
      let m = parseInt(fs[1])-1;
      if(m < 10){
        m = "0"+m;
      }
      f.setFullYear(fs[0]);
      f.setMonth(m);
      f.setDate(fs[2]);
    }
    return f;
  }
}

module.exports = ArreglaFechas;