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
const RegistroClaseInst = require(rutaInicio+'RegistroClaseInst.js');

const ConexionSng = require(rutaInicio+"ConexionBaseDatosSng.js");
const cnxSng = ConexionSng.getInstance();
const conexionBaseDatos = cnxSng.getConexionBaseDatos();

var idSala;

beforeAll(async () => {
  await ctrlAdministrador.agregar(precondiciones.administrador);
  await ctrlServicio.agregar(precondiciones.servicio);
  await ctrlServicio.agregar(precondiciones.servicioNoProvisto);
  await ctrlInstructor.agregar(precondiciones.instructor);
  idSala = await ctrlSala.agregar(precondiciones.sala);
});

afterAll(async () =>{
  for(var q of precondiciones.borrarTodo)
    await conexionBaseDatos.query(q,[],true)
});

test('Usuario cliente crea una clase', async () => {
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio,
    instructor:precondiciones.instructor.email,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio+1,
    minutoFinal:0
  };
  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e).toEqual(expect.any(Object));
  }
  expect(prueba).toBeNaN();
});

test('Crear clase con horario cuando la sala está cerrada (modo instructor)', async () => {
  var strategy = new RegistroClaseInst();
  strategy.setEmailInstructor(precondiciones.instructor.email);
  ctrlClase.setStrategyRegistro(strategy);
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio-2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio,
    horaFinal:precondiciones.calendarioSala.horaInicio-1,
    minutoFinal:0
  };
  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_NO_ID_JORNADA");
  }
  expect(prueba).toBeNaN();
  
});

test('Crear clase con horario cuando la sala está cerrada (modo administrador)', async () => {
  ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    instructor: precondiciones.instructor.email,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaFinal+1,
    minutoFinal:0
  }

  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_NO_ID_JORNADA");
  }
  expect(prueba).toBeNaN();
});

test('Crear una clase con instructor que no existe (modo instructor)', async () => {
  var strategy = new RegistroClaseInst();
  strategy.setEmailInstructor("pedro@gmail.com");
  ctrlClase.setStrategyRegistro(strategy);
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+5,
    horaFinal:precondiciones.calendarioSala.horaInicio+2,
    minutoFinal:precondiciones.calendarioSala.minutoInicio+15
  }
  
  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).toBeNaN();
});

test('Crear una clase con instructor que no existe (modo administrador)', async () => {
  ctrlClase.setStrategyRegistro(new RegistroClaseAdm());
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    instructor:"pedro@gmail.com",
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+20,
    horaFinal:precondiciones.calendarioSala.horaInicio+2,
    minutoFinal:precondiciones.calendarioSala.minutoInicio+30
  }
  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).toBeNaN();
});

test('Usuario cliente crea una clase (esta vez esposible que los valores del strategy estén inicializados, pero debería fallar)', async () => {
  datos = {
    dia:precondiciones.diaStr,
    repeticion:"NOSEREPITE",
    capacidad:precondiciones.capacidadClase,
    servicio:precondiciones.servicio.nombre,
    instructor: precondiciones.instructor.email,
    idSala,
    horaInicio:precondiciones.calendarioSala.horaInicio+2,
    minutoInicio:precondiciones.calendarioSala.minutoInicio+40,
    horaFinal:precondiciones.calendarioSala.horaInicio+2,
    minutoFinal:precondiciones.calendarioSala.minutoInicio+55
  }

  var prueba;
  try{
    prueba = await ctrlClase.agregar(datos);
  }catch(e){
    return expect(e.code).toMatch("ER_SIGNAL_EXCEPTION");
  }
  expect(prueba).toBeNaN();
  
});