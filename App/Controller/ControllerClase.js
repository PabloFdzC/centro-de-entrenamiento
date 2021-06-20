const TransaccionClase = require("./TransaccionClase.js");
const TransaccionClaseJornada = require("./TransaccionClaseJornada.js");
const Clase = require("./../Model/Clase");
const EstadoClase = require("./../Model/EstadoClase");
const Instructor = require("./../Model/Instructor");
const Servicio = require("./../Model/Servicio");

class ControllerClase{
  #ctrlInstructor = null;
  #ctrlIntervaloTiempo = null;
  #ctrlJornada = null;
  #ctrlMatriculaClase = null;
  #transaccionClase = null;
  #transaccionClaseJornada = null;
  
  constructor(ctrlInstructor, ctrlIntervaloTiempo, ctrlJornada, ctrlMatriculaClase){
    this.#ctrlInstructor = ctrlInstructor;
    this.#ctrlIntervaloTiempo = ctrlIntervaloTiempo;
    this.#ctrlJornada = ctrlJornada;
    this.#ctrlMatriculaClase = ctrlMatriculaClase;
    this.#transaccionClase = new TransaccionClase();
    this.#transaccionClaseJornada = new TransaccionClaseJornada();
  }

  async #cantidadIdIntervalos(elem, suma){
    let disponible = await this.#transaccionClase.mostrarJornadasCrearClase(elem);
    if(disponible.length > 0){
      let idsJornada = [];
      let cantidad = 0;
      let d = elem.dia;
      let mes = d.getMonth();
      if(suma === 1){
        d.setDate(1);
      } else {
        while(d.getDate() > suma && suma != 0){
          d.setDate(d.getDate()-suma);
        }
      }
      while(mes === d.getMonth()){
        for(let disp of disponible){
          let dia = new Date(disp.dia);
          if(dia.getTime() === d.getTime()){
            cantidad++;
            idsJornada.push(disp.id_jornada);
            break;
          }
        }
        if(suma === 0) break;
        d.setDate(d.getDate()+suma);
      }
      return {cantidad, idsJornada};
    }
    throw {code: "ER_NO_ID_JORNADA"};
  }

  async #cantidadIdIntervalosExistentes(elem){
    let disponible = await this.#transaccionClase.mostrarJornadasCrearClase(elem);
    let existentes = await this.#ctrlJornada.mostrarJornadasCrearClase(elem);
    if(disponible.length > 0){
      let idsJornada = [];
      let cantidad = 0;
      let d = elem.dia;
      let mes = d.getMonth();
      if(suma === 1){
        d.setDate(1);
      } else {
        while(d.getDate() > suma && suma != 0){
          d.setDate(d.getDate()-suma);
        }
      }
      while(mes <= d.getMonth()){
        for(let disp of disponible){
          let dia = new Date(disp.dia);
          if(dia.getTime() === d.getTime()){
            cantidad++;
            idsJornada.push(disp.id_jornada);
            break;
          }
        }
        if(suma === 0) break;
        d.setDate(d.getDate()+suma);
      }
      return {cantidad, idsJornada};
    }
    throw {code: "ER_NO_ID_JORNADA"};
  }

  async agregar(elem){
    elem.estado = EstadoClase.AGENDADA;
    return await this.agregarAux(elem);
  }

  async agregarAux(elem){
    let cantidadIds = {cantidad:0, idsJornada:[]};
    if(elem.repeticion == "CADASEMANADELMES"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 7);
    } else if(elem.repeticion == "TODOSLOSDIASDELMES"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 1);
    } else if(elem.repeticion == "NOSEREPITE"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 0);
    } else if(elem.aplicarTodas){
      cantidadIds = await this.#cantidadIdIntervalosExistentes(elem);
    }
    let listaIntervalos = this.#ctrlIntervaloTiempo.listaIntervalosObj(elem, cantidadIds.cantidad);
    let idClase;
    if(listaIntervalos.length > 0){
      if(elem.idClase){
        idClase = elem.idClase;
      } else{
        idClase = await this.#transaccionClase.agregar(elem);
      }
      let primerId = await this.#ctrlIntervaloTiempo.agregar(listaIntervalos[0]);
      listaIntervalos.shift();
      if(listaIntervalos.length > 0){
        await this.#ctrlIntervaloTiempo.agregarMultiples(listaIntervalos);
      }
      let listaClaseJornada = this.listaClaseJornadaObj(idClase, cantidadIds.idsJornada, primerId, primerId+listaIntervalos.length);
      let r = await this.#transaccionClaseJornada.agregarMultiples(listaClaseJornada);
      return r;
    }
    throw {code: "ER_NO_ID_JORNADA"};
  }

  async consultar(elem){
    var claseresult = await this.#transaccionClase.consultar(elem);
    return await this.#formatoClase(claseresult, {conHorario:true,conMatricula:true});
  }

  async modificar(elem){
    return await this.agregarAux(elem);
  }

  async eliminar(elem){
    let r = await this.#transaccionClase.eliminar(elem);
    return r;
  }

  async mostrarTodoXMes(elem){
    var listaclasesresult = await this.#transaccionClase.mostrarTodoXMes(elem);
    var i;
    var listaClases = [];
    for(i = 0; i < listaclasesresult.length; i++){
      var claseresult = listaclasesresult[i];
      var clase = await this.#formatoClase(claseresult);
      listaClases.push(clase);
    }
    return listaClases;
  }

  async agregarInstructorTemporal(elem){
    let r =  await this.#transaccionClase.agregarInstructorTemporal(elem);
    return r;
  }

  async #formatoClase(claseresult, opciones={conHorario:false,conMatricula:false}){
    var instructor = new Instructor(claseresult.primer_nombre,
      claseresult.segundo_nombre,
      claseresult.primer_apellido,
      claseresult.segundo_apellido,
      claseresult.fecha_nacimiento,
      claseresult.telefono,
      claseresult.email,
      claseresult.identificacion,
      null
      );
    var instructor_temporal = null;
    if(claseresult.email_instructor_temporal){
      let iT = await this.#ctrlInstructor.consultar(claseresult.email_instructor_temporal);
      instructor_temporal = new Instructor(iT.primer_nombre,
        iT.segundo_nombre,
        iT.primer_apellido,
        iT.segundo_apellido,
        iT.fecha_nacimiento,
        iT.telefono,
        iT.email,
        iT.identificacion,
        null
        );
    }
    var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
    var matriculas = [];
    var horario = [];
    if(opciones.conHorario){
      horario = await this.#ctrlIntervaloTiempo.mostrarIntervaloXIdClase(claseresult.id_clase);
    }
    if(opciones.conMatricula){
      matriculas = await this.#ctrlMatriculaClase.mostrarTodosXIdClase(claseresult.id_clase);
    }
    var clase = new Clase(claseresult.id_clase,
      claseresult.capacidad,
      claseresult.estado_clase,
      horario,
      instructor_temporal,
      servicio,
      instructor,
      matriculas
      );
      return clase
  }

  listaClaseJornadaObj(idClase, jornadaIds, primerIdIntervalo, ultimoIdIntervalo){
    var lista = [];
    var i = 0;
    for(; primerIdIntervalo <= ultimoIdIntervalo; primerIdIntervalo++){
      lista.push([idClase, primerIdIntervalo, jornadaIds[i]]);
      i++;
    }
    return lista;
  }

}

module.exports = ControllerClase;