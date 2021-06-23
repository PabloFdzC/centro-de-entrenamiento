const TransaccionClase = require("./TransaccionClase.js");
const TransaccionClaseJornada = require("./TransaccionClaseJornada.js");
const Clase = require("./../Model/Clase");
const EstadoClase = require("./../Model/EstadoClase");
const ArreglaFechas = require("./ArreglaFechas.js");

class ControllerClase{
  #ctrlInstructor = null;
  #ctrlIntervaloTiempo = null;
  #ctrlMatriculaClase = null;
  #ctrlServicio = null;
  #transaccionClase = null;
  #transaccionClaseJornada = null;
  #clases = null;
  
  constructor(ctrlInstructor, ctrlIntervaloTiempo, ctrlMatriculaClase, ctrlServicio){
    this.#ctrlInstructor = ctrlInstructor;
    this.#ctrlIntervaloTiempo = ctrlIntervaloTiempo;
    this.#ctrlMatriculaClase = ctrlMatriculaClase;
    this.#ctrlServicio = ctrlServicio;
    this.#clases = {};
    this.#transaccionClase = new TransaccionClase();
    this.#transaccionClaseJornada = new TransaccionClaseJornada();
  }

  async #cantidadIdIntervalos(elem, suma){
    let disponible = await this.#transaccionClase.mostrarJornadasCrearClase(elem);
    if(disponible.length > 0){
      let idsJornada = [];
      let cantidad = 0;
      let d = ArreglaFechas.stringAFecha(elem.dia);
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
          let dia = ArreglaFechas.stringAFecha(disp.dia);
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
  //TODO
  async #cantidadIdIntervalosExistentes(elem){
    let disponible = await this.#transaccionClase.mostrarJornadasCrearClase(elem);
    //let existentes = await this.#ctrlJornada.mostrarJornadasCrearClase(elem);
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
          let dia = ArreglaFechas.stringAFecha(disp.dia);
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
    var r = await this.agregarAux(elem);
    elem.id = r;
    this.agregaMemoria(elem);
    return r;
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
    var instructorTemporal = null;
    if(claseresult.email_instructor_temporal){
      let iT = await this.#ctrlInstructor.consultar(claseresult.email_instructor_temporal);
      instructorTemporal = this.#ctrlInstructor.agregaMemoria({
        primerNombre:iT.primer_nombre,
        segundoNombre:iT.segundo_nombre,
        primerApellido:iT.primer_apellido,
        segundoApellido:iT.segundo_apellido,
        fechaNacimiento:iT.fecha_nacimiento,
        telefono:iT.telefono,
        email:iT.email,
        identificacion:iT.identificacion
        });
    }
    var servicio = this.#ctrlServicio.agregaMemoria({
      nombre:claseresult.nombre_servicio,
      costoMatricula:claseresult.costo_matricula
    });
    var matriculas = [];
    var horario = {};
    if(opciones.conHorario){
      horario = await this.#ctrlIntervaloTiempo.mostrarIntervaloXIdClase(claseresult.id_clase);
    }
    if(opciones.conMatricula){
      matriculas = await this.#ctrlMatriculaClase.mostrarPersonasMatriculadas(claseresult.id_clase);
    }
    var clase = this.agregaMemoria({
      id: claseresult.id_clase,
      capacidad:claseresult.capacidad,
      estado:claseresult.estado_clase,
      horario:horario,
      instructorTemporal,
      servicio,
      instructor,
      matriculas
    });
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

  agregaMemoria(elem = {id:null,capacidad:null,estado:null,horario:null,instructorTemporal:null,servicio:null,instructor:null,matriculas:null}){
    if(!(elem.id in this.#clases)){
      this.#clases[elem.id] = new Clase(elem.id,
        elem.capacidad,
        elem.estado,
        elem.horario,
        elem.instructorTemporal,
        elem.servicio,
        elem.instructor,
        elem.matriculas);
    } else {
      let c = this.#clases[elem.id];
      if(elem.capacidad != null && c.getCapacidad() != elem.capacidad){
        c.setCapacidad(elem.capacidad);
      }
      if(elem.estadoClase != null && c.getEstado() != elem.estado){
        c.setEstado(elem.estado);
      }
      if(elem.horario != null){
        var horario = c.getHorario();
        if(typeof(elem.horario) === 'object'){
          for(let eh in elem.horario){
            if(!(eh in horario)){
              horario[eh] = elem.horario[eh];
            }
          }
          c.setHorario(horario);
        }
      }
      if(elem.instructorTemporal != null && c.getInstructorTemporal() != elem.instructorTemporal){
        c.setInstructorTemporal(elem.instructorTemporal);
      }
      if(elem.servicio != null && c.getServicio() != elem.servicio){
        c.setServicio(elem.servicio);
      }
      if(elem.instructor != null && c.getInstructor() != elem.instructor){
        c.setInstructor(elem.instructor);
      }
      if(elem.matriculas != null){
        c.setMatriculas(elem.matriculas);
      }
    }
    return this.#clases[elem.id];
  }

}

module.exports = ControllerClase;