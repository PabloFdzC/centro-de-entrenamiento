$('body').ready(function(){

  construyeIniciarSesion = function (){
    const html =  `
    <div class="d-grid gap-4">
      <div class="text-center mt-4">
        <img src="../Images/Logo.png" class="rounded" alt="Logo del centro de entrenamiento">
      </div>
      <h2 class="text-center">Iniciar sesión</h2>
      <form class="d-grid gap-4">
        <div class="d-grid col-9 mx-auto gap-2">
          <div>
            <label for="EmailInput" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="EmailInput" aria-describedby="Email">
          </div>
          <div>
            <label for="PasswordInput" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="PasswordInput">
          </div>
        </div>
        <div class="d-grid col-5 mx-auto text-center gap-2">
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          <a type="button" class="link irRegistrarse">Registrarse</a>
        </div>
      </form>
    </div>
    `;
    $('#cardCont').css("width", "27rem");
    $('#cardB').empty();
    $('#cardB').append(html);
  }
  
  construyeRegistrarse = function(){
    const html =  `
    <div class="d-grid gap-4">
      <h2 class="text-center">Registrase</h2>
      <form class="d-grid gap-4">
        <div class="d-grid col-11 mx-auto gap-2">
          <div class="row">
            <div class="d-grid col-6">
              <label for="PrimerNombre" class="form-label">Primer nombre</label>
              <input type="text" class="form-control" id="PrimerNombre" aria-describedby="Primer nombre">
            </div>
            <div class="d-grid col-6">
              <label for="SegundoNombre" class="form-label">Segundo nombre</label>
              <input type="text" class="form-control" id="SegundoNombre" aria-describedby="Segundo nombre">
            </div>
          </div>
          <div class="row">
            <div class="d-grid col-6">
              <label for="PrimerApellido" class="form-label">Primer apellido</label>
              <input type="text" class="form-control" id="PrimerNombre" aria-describedby="Primer apellido">
            </div>
            <div class="d-grid col-6">
              <label for="SegundoApellido" class="form-label">Segundo apellido</label>
              <input type="text" class="form-control" id="SegundoApellido" aria-describedby="Segundo apellido">
            </div>
          </div>
          <div class="row">
            <div class="d-grid col-6">
              <label for="Identificacion" class="form-label">Identificación</label>
              <input type="text" class="form-control" id="Identificacion" aria-describedby="Identificación">
            </div>
            <div class="d-grid col-6">
              <label for="FechaNacimiento" class="form-label">Fecha de nacimiento</label>
              <input type="date" class="form-control" id="FechaNacimiento" aria-describedby="Fecha de nacimiento">
            </div>
          </div>
          <div class="row">
            <div class="d-grid col-6">
              <label for="Telefono" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="Telefono" aria-describedby="Teléfono">
            </div>
            <div class="d-grid col-6">
              <label for="EmailInput" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="EmailInput" aria-describedby="Email">
            </div>
          </div>
          <div class="row">
            <div class="d-grid col-6">
              <label for="Contrasenna" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="Contrasenna" aria-describedby="Contraseña">
            </div>
            <div class="d-grid col-6">
              <label for="CContrasenna" class="form-label">Confirmar contraseña</label>
              <input type="password" class="form-control" id="CContrasenna" aria-describedby="Confirmar contraseña">
            </div>
          </div>
        </div>
        <div class="d-grid col-11 mx-auto gap-2">
          <div class="row justify-content-end">
            <div class="d-grid col-2">
              <button type="button" class="btn btn-secondary irInicioSesion">Volver</button>
            </div>
            <div class="d-grid col-2">
              <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    `;
    $('#cardCont').css("width", "40rem");
    $('#cardB').empty();
    $('#cardB').append(html);
    $('#cardB')
  }

  construyeIniciarSesion();
  $('#cardB').on('click', '.irRegistrarse',construyeRegistrarse);
  $('#cardB').on('click', '.irInicioSesion',construyeIniciarSesion);
});
