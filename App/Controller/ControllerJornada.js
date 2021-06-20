const TransaccionJornada = require("./TransaccionJornada.js");
const Servicio = require("./../Model/Servicio.js");
const Clase = require("./../Model/Clase.js");
const Instructor = require("./../Model/Instructor.js");
const IntervaloTiempo = require("./../Model/IntervaloTiempo.js");
const Jornada = require("./../Model/Jornada.js");
const ArreglaFechas = require("./ArreglaFechas.js");

class ControllerJornada{
  #ctrlInstructor = null;
  #ctrlMatriculaClase = null;
  #transaccionJornada = null;
  #ctrlIntervaloTiempo = null;

  constructor(ctrlInstructor, ctrlMatriculaClase, ctrlIntervaloTiempo){
    this.#ctrlInstructor = ctrlInstructor;
    this.#ctrlMatriculaClase = ctrlMatriculaClase;
    this.#ctrlIntervaloTiempo = ctrlIntervaloTiempo;
    this.#transaccionJornada = new TransaccionJornada();
  }

  async consultar(elem){
    var listaclasesresult = await this.#transaccionJornada.mostrarClasesJornada(elem.id);
    var listaClases = [];
    console.log();
    for(var i = 0; i < listaclasesresult.length; i++){
      var claseresult = listaclasesresult[i];
      var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, null);
      var instructor_temporal = claseresult.email_instructor_temporal;
      if(instructor_temporal){
        instructor_temporal = await this.#ctrlInstructor.consultar(claseresult.email_instructor_temporal);
      }
      var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
      var intervalo = new IntervaloTiempo(claseresult.id_intervalo, claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
      var listaClientes = await this.#ctrlMatriculaClase.mostrarPersonasMatriculadas(claseresult.id_clase);
      var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, [intervalo], instructor_temporal, servicio, instructor, listaClientes);
      listaClases.push(clase);
    }
    var j = await this.#transaccionJornada.consultar(elem.id);
    var ha = new IntervaloTiempo(j.id_intervalo, j.hora_inicio, j.minuto_inicio, j.hora_final, j.minuto_final);
    var jornada = new Jornada(j.id_jornada,ArreglaFechas.baseParaFecha(j.dia),ha,listaClases,listaClases.length);
    return jornada;
  }

  #crearJornadasCalendario(valores, id, dia, idSala, suma){
    let mes = dia.getMonth();
    let hoy = new Date();
    console.log("HOY:"+hoy.getFullYear()+"-"+hoy.getMonth()+"-"+hoy.getDate());
    if(suma === 1){
      dia.setDate(1);
    } else {
      while(dia.getDate() > suma && suma != 0){
        dia.setDate(dia.getDate()-suma);
      }
    }
    while(mes === dia.getMonth()){
      if((dia.getFullYear() === hoy.getFullYear() &&
       hoy.getMonth() === dia.getMonth()&& dia.getDate() >= hoy.getDate()) ||
       (dia.getFullYear() >= hoy.getFullYear() 
       && dia.getMonth() > hoy.getMonth())){
        let diaBase = new Date(dia.getTime());
        console.log("DIABASE:"+hoy.getFullYear()+"-"+hoy.getMonth()+"-"+hoy.getDate());
        console.log(ArreglaFechas.fechaParaBase(diaBase));
        valores.push([ArreglaFechas.fechaParaBase(diaBase), id, idSala]);
      }
      dia.setDate(dia.getDate()+suma);
    }
    console.log(valores);
    return valores;
  }
  
  async crearCalendario(idSala, elem){
    var valores = [];
    for(var i = 0; i < elem.length; i++){
      var dia = new Date(elem[i].dia);
      console.log(dia);
      var id_intervalo = await this.#ctrlIntervaloTiempo.agregar(elem[i]);
      if(elem[i].repeticion == "CADASEMANADELMES"){
        valores = this.#crearJornadasCalendario(valores, id_intervalo, dia, idSala, 7);
      } else if(elem[i].repeticion == "TODOSLOSDIASDELMES"){
        valores = this.#crearJornadasCalendario(valores, id_intervalo, dia, idSala, 1);
      } else if(elem.repeticion == "NOSEREPITE"){
        valores.push([ArreglaFechas.fechaParaBase(elem[i].dia), id_intervalo, idSala]);
      }
    }
    if(valores.length > 0){
      var r = await this.#transaccionJornada.agregarMultiples(valores);
      console.log(r);
      return r;
    }
    throw {code: "ER_NO_CALENDARIO"};
  }

  //TODO
  async modificarCalendario(id, calendarioA, calendarioE){
    await this.crearCalendario(id, calendarioA);
    await this.#ctrlIntervaloTiempo.eliminarMultiples(calendarioE);
    let valoresE = [];
    for(let i = 0; i < elem.length; i++){
      let valor = [elem[i].idJornada];
      valoresE.push(valor);
    }
    await this.#transaccionJornada.agregarMultiples(valoresE);
    return id;
  }

  async mostrarCalendario(elem){
    var listajornadasresult = await this.#transaccionJornada.mostrarCalendario(elem);
    var i;
    var listajornadas =[];
    for(i = 0; i < listajornadasresult.length; i++){
      var jornadaresult = listajornadasresult[i];
      var intervalo = new IntervaloTiempo(jornadaresult.id_intervalo, jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
      var cantidadClases = await this.#transaccionJornada.cantidadClasesDeJornada(jornadaresult.id_jornada);
      var jornada = new Jornada(jornadaresult.id_jornada, ArreglaFechas.baseParaFecha(jornadaresult.dia), intervalo, null, cantidadClases);
      listajornadas.push(jornada);
    }
    return listajornadas;
  }

}

module.exports = ControllerJornada;