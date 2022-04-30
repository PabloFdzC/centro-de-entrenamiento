const rutaInicio = './../Controller/';

const precondiciones = require('./precondiciones.js');
const ControllersSng = require(rutaInicio+'ControllersSng.js');
const ctrlSng = ControllersSng.getInstance();
const ctrlClase = ctrlSng.getControllerClase();
const ctrlAdministrador = ctrlSng.getControllerAdministrador();
const ctrlInstructor = ctrlSng.getControllerInstructor();
const ctrlServicio = ctrlSng.getControllerServicio();
const ctrlSala = ctrlSng.getControllerSala();
const ctrlCliente = ctrlSng.getControllerCliente();
const ctrlJornada = ctrlSng.getControllerJornada();
const ctrlMatriculaClase = ctrlSng.getControllerMatriculaClase();
const RegistroClaseAdm = require(rutaInicio+'RegistroClaseAdm.js');

const ConexionSng = require(rutaInicio+"ConexionBaseDatosSng.js");
const cnxSng = ConexionSng.getInstance();
const conexionBaseDatos = cnxSng.getConexionBaseDatos();

var idSala;
var idClaseJornadaPasada = null;
var idClaseJornadaNormal = null;

beforeAll(async () => {
  await ctrlAdministrador.agregar(precondiciones.administrador);
  await ctrlServicio.agregar(precondiciones.servicio);
  await ctrlServicio.agregar(precondiciones.servicioNoProvisto);
  await ctrlInstructor.agregar(precondiciones.instructor);
  await ctrlCliente.agregar(precondiciones.cliente);
  idSala = await ctrlSala.agregar(precondiciones.salaHorarioAntes);
  ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
  let claseNormal = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    instructor: precondiciones.instructor.email,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio+2,
    minutoFinal:35
  };
  let clasePasada = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    instructor: precondiciones.instructor.email,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio,
    minutoFinal:35
  };

  await ctrlClase.agregar(claseNormal);
  await ctrlClase.agregar(clasePasada);
  
  var jornadas = await ctrlJornada.mostrarCalendario({
    mes:precondiciones.dia.getMonth()+1,
    idSala,
    email:precondiciones.cliente.email,
    tipo:'Cliente'
  });
  var jornadaPrueba;
  for(let j of jornadas){
    if(j.getDia().getDate() == precondiciones.dia.getDate()){
      jornadaPrueba = j;
    }
  }
  for(let c in jornadaPrueba.getClases()){
    if(idClaseJornadaNormal != null){
      idClaseJornadaPasada = c;
    } else {
      idClaseJornadaNormal = c;
    }
  }

  for(let i = 0; i < precondiciones.capacidadClase; i++){
    let c = precondiciones.cliente;
    c.email = "cliente"+i+"@cliente.com",
    await ctrlCliente.agregar(precondiciones.cliente);
    await ctrlMatriculaClase.agregar({
      email:c.email,
      idClaseJornada:idClaseJornadaNormal
    });
  }
  precondiciones.cliente.email = "cliente@cliente.com";
});

afterAll(async () =>{
  for(var q of precondiciones.borrarTodo)
    await conexionBaseDatos.query(q,[],true)
});

test('Matricular clase que no existe', async () => {
  var prueba;
  try{
    prueba = await ctrlMatriculaClase.agregar({
      email:precondiciones.cliente.email,
      idClaseJornada:-1
    });
  }catch(e){
    expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});

test('Matricular clase que ya está llena', async () => {
  var prueba;
  try{
    prueba = await ctrlMatriculaClase.agregar({
      email:precondiciones.cliente.email,
      idClaseJornada:idClaseJornadaNormal
    });
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});

test('Matricular clase que ya pasó', async () => {
  var prueba;
  try{
    prueba = await ctrlMatriculaClase.agregar({
      email:precondiciones.cliente.email,
      idClaseJornada:idClaseJornadaPasada
    });
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});