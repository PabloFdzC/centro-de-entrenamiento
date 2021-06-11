$('body').ready(function(){
  var clientes = new Clientes();

  var res = clientes.verClientes();
  if(res){
    $('#clientes').append(res);
  }

});