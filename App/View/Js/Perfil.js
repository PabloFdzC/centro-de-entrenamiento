$('body').ready(function(){
  var perfil = new Perfil();
  var clientes = new Clientes();
  var instructores = new Instructores();
  
  $('#formPerfil').submit(async function(event){
    event.preventDefault();
    let form = $('#formPerfil')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await perfil.modificarPerfil(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  $('#formContrasenna').submit(async function(event){
    event.preventDefault();
    let form = $('#formContrasenna')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      try{
        await perfil.modificarContrasenna(info);
      }catch(err){
        muestraMensaje("Fallo", err.responseText);
      }
    }
  });

  cargar = async function(){
    let tipo = localStorage.getItem('tipo');
    let email = localStorage.getItem('email');
    let u = null;
    try{
      if(tipo == "Cliente"){
        u = await clientes.mostrarCliente(email);
      } else if(tipo == "Instructor"){
        u = await instructores.mostrarInstructor(email);
      }
      if(u){
        u = JSON.parse(u);
        $('#primerNombre').val(u.primerNombre);
        $('#segundoNombre').val(u.segundoNombre);
        $('#primerApellido').val(u.primerApellido);
        $('#segundoApellido').val(u.segundoApellido);
        $('#identificacion').val(u.identificacion);
        $('#fechaNacimiento').val(u.fechaNacimiento);
        $('#telefono').val(u.telefono);
        $('#email').val(u.email);
      } else {
        $('#email').val(localStorage.getItem('email'));
        $('#email').prop('disabled', true);
      }
    }catch(err){
      muestraMensaje("Fallo", err.responseText);
    }
  };

  cargar();

});