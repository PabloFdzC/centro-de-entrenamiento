class Perfil{
  async modificarPerfil(info, tipo){
    if(tipo == "Instructor"){
      let instructores = new Instructores();
      return await instructores.modificarInstructor(info);
    } else if(tipo == "Cliente"){
      let i = Utilidades.convertirAJSON(info);
      return await Utilidades.ajaxCall('/modificarCliente', 'POST', i, "Datos modificados con éxito");
    }
  }

  async modificarContrasenna(info, tipo){
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
    throw {responseText:"El tipo de usuario no está registrado"}
  }
}