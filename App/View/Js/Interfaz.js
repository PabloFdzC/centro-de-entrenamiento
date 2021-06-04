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
        <div class="d-grid col-9 mx-auto gap-2">
          <div class="row">
            <div class="d-grid col-6">
              <label for="EmailInput" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="EmailInput" aria-describedby="Email">
            </div>
            <div class="d-grid col-6">
              <label for="PasswordInput" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="PasswordInput">
            </div>
          </div>
        </div>
        <div class="d-grid col-5 mx-auto text-center gap-2">
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          <a class="link irInicioSesion" type="button">Registrarse</a>
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
