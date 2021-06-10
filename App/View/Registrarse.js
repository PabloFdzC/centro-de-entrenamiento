class Registrarse{

  registrarse(info, funcExito, funcError){
    ajaxCall('/crearCliente', 'POST', info, function(r){
      console.log(r);
    }, function(xhr, status, error){
      console.log(xhr);
    });
  }

}