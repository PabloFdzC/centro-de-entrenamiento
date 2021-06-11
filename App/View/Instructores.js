class Instructores{

  crearInstructor(info){
    ajaxCall('/crearInstructor', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor creado con éxito");   
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "No se pudo crear el instructor");
    });
  }

  modificarInstructor(info){
    ajaxCall('/modificarInstructor', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor modificados con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "No se pudo modificar el instructor");
    });
  }

  mostrarInstructor(email){
    var res = null;
    ajaxCall('/getInstructor/'+email, 'GET', {}, function(instructor){
      res = instructor;
    }, function(xhr, status, error){
      console.log(xhr);
    });
    return res;
  }

  mostrarListadoInstructores(){
    var res = null;
    ajaxCall('/mostrarInstructores', 'GET', {}, function(html){
      res = html;
    }, function(xhr, status, error){
      console.log(xhr);
    });
    return res;
  }

  eliminarInstructor(email){
    var res;
    ajaxCall('/eliminarInstructor', 'POST', {email}, function(r){
      console.log(r);
      muestraMensaje("Exito", "Se eliminó el instructor");
      res = true;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", "No se pudo eliminar el instructor");
      res = false;
    });
    return res;
  }

}