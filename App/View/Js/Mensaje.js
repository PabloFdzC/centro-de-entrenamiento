function muestraMensaje(titulo, mensaje){
  $('#tituloMensaje').empty();
  $('#tituloMensaje').append(titulo);
  $('#mensaje').empty();
  $('#mensaje').append(mensaje);
  let modal = new bootstrap.Modal(document.getElementById('modalMensaje'));
  modal.show();
}