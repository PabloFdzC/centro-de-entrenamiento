function ajaxCall(url, type, data, successFunc, errorFunc){
  console.log(Array.from(data));
  var d;
  try{
    d = JSON.stringify(Object.fromEntries(data));
  } catch(e){
    d = {};
  }
  $.ajax({
    url: url,
    type: type,
    data: d,
    contentType: "application/json; charset=utf-8",
    success: successFunc,
    error: errorFunc,
    complete: function(response, textStatus) {
      console.log(textStatus);
      console.log(response);
    }
  });
}