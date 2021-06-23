class Perfil{
  async modificarPerfil(info){
    let tipo = localStorage.getItem('tipo_usuario');
    let i = Utilidades.convertirAJSON(info);
    if(tipo == "Instructor"){
      let instructores = Instructores();
      return await instructores.modificarInstructor(i);
    } else if(tipo == "Cliente"){
      return await Utilidades.ajaxCall('/modificarCliente', 'POST', i, "Datos modificados con éxito");
    }
  }

  async modificarContrasenna(info){
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
      return await Utilidades.ajaxCall(ruta, 'POST', i, "Contraseña modificada con éxito");
    }
  }
}