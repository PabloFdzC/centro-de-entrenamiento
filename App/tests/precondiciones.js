const rutaInicio = './../Controller/'
const ArreglaFechas = require(rutaInicio+'ArreglaFechas.js');

const administrador = {
  email:"admin@admin.com"
};

const servicio = {
  nombre:"Yoga",
  costo:null
};

const servicioNoProvisto = {
  nombre:"Pilates",
  costo:null
};

const instructor = {
  email: "instructor@instructor.com",
  identificacion: "111111111",
  primerNombre: "ins",
  segundoNombre: "truc",
  primerApellido: "tor",
  segundoApellido: "prueba",
  fechaNacimiento: "1990-04-28",
  telefono: "88888888",
  servicios: [servicio.nombre]
};

var dia = new Date();
const diaStr = ArreglaFechas.fechaAString(dia);

const calendarioSala = {
  dia:diaStr,
  repeticion: "NOSEREPITE",
  horaInicio: dia.getHours(),
  horaFinal: dia.getHours()+5,
  minutoInicio: 0,
  minutoFinal: 0
};

const calendarioAntes = {
  dia:diaStr,
  repeticion: "NOSEREPITE",
  horaInicio: dia.getHours()-2,
  horaFinal: dia.getHours()+5,
  minutoInicio: 0,
  minutoFinal: 0
};

const sala = {
  costo:1000,
  capacidad:20,
  aforo:50,
  servicios: [servicio.nombre, servicioNoProvisto.nombre],
  calendario: [calendarioSala]
}

const salaHorarioAntes = {
  costo:1000,
  capacidad:20,
  aforo:50,
  servicios: [servicio.nombre],
  calendario: [calendarioAntes]
}

const capacidadClase = 5;

const borrarTodo = [
  'DELETE FROM servicios_de_instructor',
  'DELETE FROM administrador',
  'DELETE FROM matricula',
  'DELETE FROM pago',
  'DELETE FROM clases_en_jornada',
  'DELETE FROM clase',
  'DELETE FROM instructor',
  'DELETE FROM jornada',
  'DELETE FROM intervalo_tiempo',
  'DELETE FROM sala',
  'DELETE FROM servicio',
  'DELETE FROM llaves',
  'DELETE FROM cliente'];

const cliente = {
  email: "cliente@cliente.com",
  identificacion: "111111112",
  primerNombre: "cli",
  segundoNombre: "en",
  primerApellido: "te",
  segundoApellido: "prueba",
  fechaNacimiento: "1990-04-28",
  telefono: "88888889",
  contrasenna: '1234'
};

module.exports = {
  administrador,
  servicio,
  instructor,
  dia,
  diaStr,
  calendarioSala,
  sala,
  capacidadClase,
  borrarTodo,
  cliente,
  salaHorarioAntes,
  servicioNoProvisto
}