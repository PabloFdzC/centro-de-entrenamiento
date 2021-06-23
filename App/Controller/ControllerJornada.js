const TransaccionJornada = require("./TransaccionJornada.js");
const Jornada = require("./../Model/Jornada.js");
const ArreglaFechas = require("./ArreglaFechas.js");

class ControllerJornada{
  #ctrlInstructor = null;
  #ctrlMatriculaClase = null;
  #transaccionJornada = null;
  #ctrlIntervaloTiempo = null;
  #ctrlServicio = null;
  #ctrlClase = null;
  #jornadas = null;

  constructor(ctrlInstructor, ctrlMatriculaClase, ctrlIntervaloTiempo, ctrlServicio, ctrlClase){
    this.#ctrlInstructor = ctrlInstructor;
    this.#ctrlMatriculaClase = ctrlMatriculaClase;
    this.#ctrlIntervaloTiempo = ctrlIntervaloTiempo;
    this.#ctrlServicio = ctrlServicio;
    this.#ctrlClase = ctrlClase;
    this.#transaccionJornada = new TransaccionJornada();
    this.#jornadas = {};
  }

  async consultar(elem){
    var listaclasesresult = await this.#transaccionJornada.mostrarClasesJornada(elem.id);
    var listaClases = [];
    for(var i = 0; i < listaclasesresult.length; i++){
      var claseresult = listaclasesresult[i];
      var instructor = this.#ctrlInstructor.agregaMemoria({
        primerNombre:claseresult.primer_nombre,
        segundoNombre:claseresult.segundo_nombre,
        primerApellido:claseresult.primer_apellido,
        segundoApellido:claseresult.segundo_apellido,
        fechaNacimiento:claseresult.fecha_nacimiento,
        telefono:claseresult.telefono,
        email:claseresult.email,
        identificacion:claseresult.identificacion,
      });
      var instructorTemporal = claseresult.email_instructor_temporal;
      if(instructorTemporal){
        instructorTemporal = await this.#ctrlInstructor.consultar(claseresult.email_instructor_temporal);
      }
      var servicio = this.#ctrlServicio.agregaMemoria({
        nombre:claseresult.nombre_servicio,
        costoMatricula:claseresult.costo_matricula
      });
      var horarioClase = {};
      horarioClase[claseresult.id_jornada] = this.#ctrlIntervaloTiempo.agregaMemoria({
        id:claseresult.id_intervalo,
        horaInicio:claseresult.hora_inicio,
        minutoInicio:claseresult.minuto_inicio,
        horaFinal:claseresult.hora_final,
        minutoFinal:claseresult.minuto_final
      });
      var matriculas = await this.#ctrlMatriculaClase.mostrarPersonasMatriculadas(claseresult.id_clase_jornada);
      var clase = this.#ctrlClase.agregaMemoria({
        id:claseresult.id_clase,
        capacidad:claseresult.capacidad,
        estado:claseresult.estado_clase,
        horario:horarioClase,
        instructorTemporal,
        servicio,
        instructor,
        matriculas
      });
      listaClases.push(clase);
    }
    var j = await this.#transaccionJornada.consultar(elem.id);
    var ha = this.#ctrlIntervaloTiempo.agregaMemoria({
      id:j.id_intervalo,
      horaInicio:j.hora_inicio,
      minutoInicio:j.minuto_inicio,
      horaFinal:j.hora_final,
      minutoFinal:j.minuto_final
    });
    var jornada = this.agregaMemoria({
      id:j.id_jornada,
      dia:j.dia,
      horarioAtencion:ha,
      clases:listaClases,
      cantidadClases:listaClases.length
    });
    return jornada;
  }

  #crearJornadasCalendario(valores, id, dia, idSala, suma){
    let mes = dia.getMonth();
    let hoy = new Date();
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
        valores.push([ArreglaFechas.fechaAString(diaBase), id, idSala]);
      }
      dia.setDate(dia.getDate()+suma);
    }
    return valores;
  }
  
  async crearCalendario(idSala, elem){
    var valores = [];
    for(var i = 0; i < elem.length; i++){
      var dia = ArreglaFechas.stringAFecha(elem[i].dia);
      var id_intervalo = await this.#ctrlIntervaloTiempo.agregar(elem[i]);
      if(elem[i].repeticion == "CADASEMANADELMES"){
        valores = this.#crearJornadasCalendario(valores, id_intervalo, dia, idSala, 7);
      } else if(elem[i].repeticion == "TODOSLOSDIASDELMES"){
        valores = this.#crearJornadasCalendario(valores, id_intervalo, dia, idSala, 1);
      } else if(elem[i].repeticion == "NOSEREPITE"){
        valores.push([ArreglaFechas.fechaAString(dia), id_intervalo, idSala]);
      }
    }
    if(valores.length > 0){
      var r = await this.#transaccionJornada.agregarMultiples(valores);
      return r;
    }
    throw {code: "ER_NO_CALENDARIO"};
  }

  async modificarCalendario(id, calendarioA, calendarioE){
    if(calendarioA.length > 0){
      await this.crearCalendario(id, calendarioA);
    }
    let valoresE = [];
    for(let i = 0; i < calendarioE.length; i++){
      let valor = [calendarioE[i].idJornada];
      valoresE.push(valor);
    }
    if(valoresE.length > 0){
      await this.#transaccionJornada.eliminarMultiples(valoresE);
    }
    if(calendarioE.length > 0){
      await this.#ctrlIntervaloTiempo.eliminarMultiples(calendarioE);
    }
    return id;
  }

  async mostrarCalendario(elem){
    var listajornadasresult = await this.#transaccionJornada.mostrarCalendario(elem);
    var i;
    var listajornadas =[];
    for(i = 0; i < listajornadasresult.length; i++){
      var j = listajornadasresult[i];
      var ha = this.#ctrlIntervaloTiempo.agregaMemoria({
        id:j.id_intervalo,
        horaInicio:j.hora_inicio,
        minutoInicio:j.minuto_inicio,
        horaFinal:j.hora_final,
        minutoFinal:j.minuto_final
      });
      var cantidadClases = await this.#transaccionJornada.cantidadClasesDeJornada(j.id_jornada);
      var jornada = this.agregaMemoria({
        id:j.id_jornada,
        dia:j.dia,
        horarioAtencion:ha,
        cantidadClases:cantidadClases
      });
      listajornadas.push(jornada);
    }
    return listajornadas;
  }

  agregaMemoria(elem = {id:null,dia:null,horarioAtencion:null,clases:null,cantidadClases:null}){
    if(!(elem.id in this.#jornadas)){
      this.#jornadas[elem.id] = new Jornada(
        elem.id,
        ArreglaFechas.stringAFecha(elem.dia),
        elem.horarioAtencion,
        elem.clases,
        elem.cantidadClases);
    } else {
      let j = this.#jornadas[elem.id];
      if(elem.dia != null && ArreglaFechas.fechaAString(j.getDia()) != elem.dia){
        j.setDia(ArreglaFechas.stringAFecha(elem.dia));
      }
      if(elem.horarioAtencion != null && j.getHorarioAtencion() != elem.horarioAtencion){
        j.setHorarioAtencion(elem.horarioAtencion);
      }
      if(elem.clases != null){
        j.setClases(elem.clases);
      }
      if(elem.cantidadClases != null){
        j.setCantidadClases(elem.cantidadClases);
      }
    }
    return this.#jornadas[elem.id];
  }

}

module.exports = ControllerJornada;