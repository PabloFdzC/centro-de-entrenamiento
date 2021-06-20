class Utilidades{
  static ajaxCall(url, tipo, datos, fExito, fError){
    $.ajax({
      url: url,
      type: tipo,
      data: datos,
      contentType: "application/json; charset=utf-8",
      success: fExito,
      error: fError
    });
  }

  static convertirAJSON(datos){
    //console.log(Array.from(datos));
    try{
      return JSON.stringify(Object.fromEntries(datos));
    } catch(e){
      console.log("No se pudo convertir a JSON");
      return {};
    }
  }

  static objetoAParametrosGet(datos){
    let s = "?";
    for(let p in datos){
      if(datos[p]){
        s += p + "=" + datos[p] + "&";
      }
    }
    if(s.length === 1){
      return "";
    } else {
      return s.slice(0, -1);
    }
  }

}