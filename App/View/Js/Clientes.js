$('body').ready(function(){
  var clientes = new Clientes();
  cargar = async function(){
    try{
      var res = await clientes.verClientes();
      if(res){
        $('#clientes').append(res);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  }

  cargar();

});