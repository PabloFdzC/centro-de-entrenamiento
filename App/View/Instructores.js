class Instructores{

  crearInstructor(info, listaServicios){
    info.append("servicios", JSON.stringify(listaServicios));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/crearInstructor', 'POST', i, function(r){
      muestraMensaje("Exito", "La contraseña del instructor es " + r.contrasenna);   
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarInstructor(info, listaServiciosA, listaServiciosE){
    info.append("servicios", JSON.stringify(listaServiciosA));
    info.append("serviciosE", JSON.stringify(listaServiciosE));
    let i = Utilidades.convertirAJSON(info);
    Utilidades.ajaxCall('/modificarInstructor', 'POST', i, function(r){
      muestraMensaje("Exito", "Instructor modificados con éxito");
    }, function(xhr, status, error){
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  async mostrarInstructor(email){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarInstructor?email='+email, 'GET', {}, function(instructor){
        resolve(instructor);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        resolve(null);
      });
    });
  }

  async mostrarListadoInstructores(esLista){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarInstructores?esLista='+esLista, 'GET', {}, function(html){
        resolve(html);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
      });
    });
  }

  async eliminarInstructor(email){
    var d = Utilidades.convertirAJSON({email});
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/eliminarInstructor', 'POST', d, function(r){
        muestraMensaje("Exito", "Se eliminó el instructor");
        resolve(true);
      }, function(xhr, status, error){
        muestraMensaje("Fallo", xhr.responseText);
        resolve(false);
      });
    });
  }

}