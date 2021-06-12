class Utilidades{
  static ajaxCall(url, type, data, successFunc, errorFunc){
    $.ajax({
      url: url,
      type: type,
      data: data,
      contentType: "application/json; charset=utf-8",
      success: successFunc,
      error: errorFunc,
      complete: function(response, textStatus) {
        console.log(textStatus);
        console.log(response);
      }
    });
  }

  static convertirAJSON(data){
    console.log(Array.from(data));
    try{
      return JSON.stringify(Object.fromEntries(data));
    } catch(e){
      console.log("No se pudo convertir a JSON");
      return {};
    }
  }

}