class Instructores{

  crearInstructor(info, listaServicios){
    let i = Utilidades.convertirAJSON(info);
    i.servicios = listaServicios;
    Utilidades.ajaxCall('/crearInstructor', 'POST', i, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor creado con éxito");   
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarInstructor(info, listaServicios){
    let i = Utilidades.convertirAJSON(info);
    i.servicios = listaServicios;
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

  async mostrarListadoInstructores(){
    return new Promise(function(resolve) {
      Utilidades.ajaxCall('/mostrarInstructores', 'GET', {}, function(html){
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