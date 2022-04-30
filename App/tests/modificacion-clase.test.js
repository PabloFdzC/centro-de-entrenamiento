const rutaInicio = './../Controller/';

const precondiciones = require('./precondiciones.js');

const ControllersSng = require(rutaInicio+'ControllersSng.js');
const ctrlSng = ControllersSng.getInstance();
const ctrlClase = ctrlSng.getControllerClase();
const ctrlAdministrador = ctrlSng.getControllerAdministrador();
const ctrlInstructor = ctrlSng.getControllerInstructor();
const ctrlServicio = ctrlSng.getControllerServicio();
const ctrlSala = ctrlSng.getControllerSala();
const RegistroClaseAdm = require(rutaInicio+'RegistroClaseAdm.js');

const ConexionSng = require(rutaInicio+"ConexionBaseDatosSng.js");
const cnxSng = ConexionSng.getInstance();
const conexionBaseDatos = cnxSng.getConexionBaseDatos();

var idSala;
var idClase;

beforeAll(async () => {
  await ctrlAdministrador.agregar(precondiciones.administrador);
  await ctrlServicio.agregar(precondiciones.servicio);
  await ctrlServicio.agregar(precondiciones.servicioNoProvisto);
  await ctrlInstructor.agregar(precondiciones.instructor);
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

  idClase = await ctrlClase.agregar(claseNormal);
});

afterAll(async () =>{
  for(var q of precondiciones.borrarTodo)
    await conexionBaseDatos.query(q,[],true)
});

test('Asignar un instructor que no existe', async () => {
  datos = {
    idSala,
    idClase,
    dia:precondiciones.diaStr,
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    estado: "PUBLICADA",
    instructor:"pedro@gmail.com",
    instructorTemporal:null,
    vistoPorInstructor:0,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio+2,
    minutoFinal:35
  };
  var prueba;
  try{
    prueba = await ctrlClase.modificar(datos);
  } catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});


test('Cambiar hora de clase a una cuando la sala esté cerrada', async () => {
  ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
  datos = {
    idSala,
    idClase,
    dia:precondiciones.diaStr,
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    estado: "PUBLICADA",
    instructor:precondiciones.instructor.email,
    instructorTemporal:null,
    vistoPorInstructor:0,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaFinal+2,
    minutoFinal:35
  };
  var prueba;
  try{
    prueba = await ctrlClase.modificar(datos);
  } catch(e){
    expect(e.code).toMatch("ER_NO_ID_JORNADA");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});

test('Asignar un servicio que el instructor no provea', async () => {
  ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
  datos = {
    idSala,
    idClase,
    dia:precondiciones.diaStr,
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    estado: "PUBLICADA",
    instructor:precondiciones.instructor.email,
    instructorTemporal:null,
    vistoPorInstructor:0,
    horaInicio:precondiciones.calendarioSala.horaInicio,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio,
    minutoFinal:35
  };
  var prueba;
  try{
    prueba = await ctrlClase.modificar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).not.toEqual(expect.any(Object));
});