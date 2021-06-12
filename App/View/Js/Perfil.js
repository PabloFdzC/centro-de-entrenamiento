$('body').ready(function(){
  var perfil = new Perfil();
  var clientes = new Clientes();
  var instructores = new Instructores();
  
  $('#formPerfil').submit(function(event){
    event.preventDefault();
    let form = $('#formPerfil')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      perfil.modificarPerfil(info);
    }
  });

  $('#formContrasenna').submit(function(event){
    event.preventDefault();
    let form = $('#formContrasenna')[0];
    if(form.checkValidity()){
      let info = new FormData(form);
      perfil.modificarContrasenna(info);
    }
  });

  cargar = async function(){
    let tipo = localStorage.getItem('tipo_usuario');
    let u = null;
    if(tipo == "Cliente"){
      u = await clientes.mostrarCliente(val);
    } else if(tipo == "Instructor"){
      u = await instructores.mostrarInstructor(val);
    }
    if(u){
      if((typeof u) === "string"){
        $('#email').val(u);
      } else {
        $('#primerNombre').val(u.getPrimerNombre());
        $('#segundoNombre').val(u.getSegundoNombre());
        $('#primerApellido').val(u.getPrimerApellido());
        $('#segundoApellido').val(u.getSegundoApellido());
        $('#identificacion').val(u.getIdentificacion());
        $('#fechaNacimiento').val(u.getFechaNacimiento());
        $('#telefono').val(u.getTelefono());
        $('#email').val(u.getEmail());
      }
    }
  };

  cargar();

});