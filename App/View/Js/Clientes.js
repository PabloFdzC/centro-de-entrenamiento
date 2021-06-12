$('body').ready(function(){
  var clientes = new Clientes();
  cargar = async function(){
    var res = await clientes.verClientes();
    if(res){
      $('#clientes').append(res);
    }
  }

});