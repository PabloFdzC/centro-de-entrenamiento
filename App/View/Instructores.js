class Instructores{

  crearInstructor(info, listaServicios){
    info.append("servicios", JSON.stringify(listaServicios));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearInstructor', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "La contraseña del instructor es " + r.contrasenna);   
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarInstructor(info, listaServicios){
    info.append("servicios", JSON.stringify(listaServicios));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/modificarInstructor', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor modificados con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  async mostrarInstructor(email){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/getInstructor/'+email, 'GET', {}, function(instructor){
        resolve(instructor);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

  async mostrarListadoInstructores(esLista){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarInstructores/'+esLista, 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
      });
    });
  }

  async eliminarInstructor(email){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/eliminarInstructor', 'POST', {email}, function(r){
        console.log(r);
        muestraMensaje("Exito", "Se eliminó el instructor");
        resolve(true);
      }, function(xhr, status, error){
        console.log(xhr);
        muestraMensaje("Fallo", xhr.responseText);
        resolve(false);
      });
    });
  }

}