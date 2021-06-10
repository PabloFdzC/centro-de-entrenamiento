function ajaxCall(url, type, data, successFunc, errorFunc){
  console.log(Array.from(data));
  $.ajax({
    url: url,
    type: type,
    data: JSON.stringify(Object.fromEntries(data)),
    contentType: "application/json; charset=utf-8",
    success: successFunc,
    error: errorFunc,
    complete: function(response, textStatus) {
      console.log(textStatus);
      console.log(response);
    }
  });
}