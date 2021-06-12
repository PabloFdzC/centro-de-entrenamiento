class Perfil{
  modificarPerfil(info){
    let tipo = localStorage.getItem('tipo_usuario');
    let i = Utilidades.convertirAJSON(info);
    if(tipo == "Instructor"){
      let instructores = Instructores();
      instructores.modificarInstructor(i);
    } else if(tipo == "Cliente"){
      Utilidades.ajaxCall('/modificarCliente', 'POST', i, function(r){
        console.log(r);
        muestraMensaje("Exito", "Datos modificados con éxito");
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
      });
    }
  }

  modificarContrasenna(info){
    let tipo = localStorage.getItem('tipo_usuario');
    let ruta = "";
    let i = Utilidades.convertirAJSON(info);
    if(tipo == "Instructor"){
      ruta = "/modificarContrasennaInstructor"
    } else if(tipo == "Cliente"){
      ruta = "/modificarContrasennaCliente"
    } else if(tipo == "Administrador"){
      ruta = "/modificarContrasennaAdministrador"
    }
    if(ruta != ""){
      Utilidades.ajaxCall(ruta, 'POST', i, function(r){
        console.log(r);
        muestraMensaje("Exito", "Contraseña modificada con éxito");
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
      });
    }
  }
}