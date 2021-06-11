class Perfil{
  modificarPerfil(info){
    let tipo = localStorage.getItem('tipo_usuario');
    if(tipo == "Instructor"){
      let i = Instructores();
      i.modificarInstructor(info);
    } else if(tipo == "Cliente"){
      ajaxCall('/modificarCliente', 'POST', info, function(r){
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
    if(tipo == "Instructor"){
      ruta = "/modificarContrasennaInstructor"
    } else if(tipo == "Cliente"){
      ruta = "/modificarContrasennaCliente"
    } else if(tipo == "Administrador"){
      ruta = "/modificarContrasennaAdministrador"
    }
    if(ruta != ""){
      ajaxCall(ruta, 'POST', info, function(r){
        console.log(r);
        muestraMensaje("Exito", "Contraseña modificada con éxito");
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
      });
    }
  }
}