class Instructores{

  crearInstructor(info){
    ajaxCall('/crearInstructor', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor creado con éxito");   
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  modificarInstructor(info){
    ajaxCall('/modificarInstructor', 'POST', info, function(r){
      console.log(r);
      muestraMensaje("Exito", "Instructor modificados con éxito");
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
  }

  mostrarInstructor(email){
    var res = null;
    ajaxCall('/getInstructor/'+email, 'GET', {}, function(instructor){
      res = instructor;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
    });
    return res;
  }

  mostrarListadoInstructores(){
    var res = null;
    ajaxCall('/mostrarInstructores', 'GET', {}, function(html){
      res = html;
    }, function(xhr, status, error){
      console.log(xhr);
      muestraMensaje("Fallo", xhr.responseText);
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
      muestraMensaje("Fallo", xhr.responseText);
      res = false;
    });
    return res;
  }

}