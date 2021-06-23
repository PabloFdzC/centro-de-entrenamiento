class Utilidades{
  static ajaxCall(url, tipo, datos, mensajeExito="", redir=""){
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        type: tipo,
        data: datos,
        contentType: "application/json; charset=utf-8",
        success: function(r){
          if(mensajeExito != ""){
            muestraMensaje("Éxito", mensajeExito);
          }
          if(redir != ""){
            window.location.href = redir;
          }
          resolve(r);
        },
        error: function(err){
          reject(err);
        }
      });
    });
  }

  static convertirAJSON(datos){
    try{
      return JSON.stringify(Object.fromEntries(datos));
    } catch(e){
      console.log(e);
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