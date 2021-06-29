const TransaccionClase = require("./TransaccionClase.js");
const TransaccionClaseJornada = require("./TransaccionClaseJornada.js");
const Clase = require("./../Model/Clase");
const EstadoClase = require("./../Model/EstadoClase");
const ArreglaFechas = require("./ArreglaFechas.js");
const HorarioClase = require("../Model/HorarioClase.js");

class ControllerClase{
  #ctrlInstructor = null;
  #ctrlAdministrador = null;
  #ctrlIntervaloTiempo = null;
  #ctrlMatriculaClase = null;
  #ctrlServicio = null;
  #transaccionClase = null;
  #transaccionClaseJornada = null;
  #clases = null;
  #horariosClase = null;
  #strategyRegistro = null;
  
  constructor(ctrlInstructor, ctrlAdministrador, ctrlIntervaloTiempo, ctrlMatriculaClase, ctrlServicio){
    this.#ctrlInstructor = ctrlInstructor;
    this.#ctrlAdministrador = ctrlAdministrador;
    this.#ctrlIntervaloTiempo = ctrlIntervaloTiempo;
    this.#ctrlMatriculaClase = ctrlMatriculaClase;
    this.#ctrlServicio = ctrlServicio;
    this.#clases = {};
    this.#horariosClase = {};
    this.#transaccionClase = new TransaccionClase();
    this.#transaccionClaseJornada = new TransaccionClaseJornada();
  }

  async #cantidadIdIntervalos(elem, suma){
    let disponible = await this.#transaccionClase.mostrarJornadasDisponibles(elem);
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

  async agregar(elem){
    elem = this.#strategyRegistro.agregar(elem);
    let cantidadIds = {cantidad:0, idsJornada:[]};
    if(elem.repeticion == "CADASEMANADELMES"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 7);
    } else if(elem.repeticion == "TODOSLOSDIASDELMES"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 1);
    } else if(elem.repeticion == "NOSEREPITE"){
      cantidadIds = await this.#cantidadIdIntervalos(elem, 0);
    } 
    let listaIntervalos = this.#ctrlIntervaloTiempo.listaIntervalosObj(elem, cantidadIds.cantidad);
    if(listaIntervalos.length > 0){
      let idClase = await this.#transaccionClase.agregar(elem);
      let primerId = await this.#ctrlIntervaloTiempo.agregar(listaIntervalos[0]);
      listaIntervalos.shift();
      if(listaIntervalos.length > 0){
        await this.#ctrlIntervaloTiempo.agregarMultiples(listaIntervalos);
      }
      let listaClaseJornada = this.listaClaseJornadaObj(idClase, cantidadIds.idsJornada, primerId, primerId+listaIntervalos.length);
      let r = await this.#transaccionClaseJornada.agregarMultiples(listaClaseJornada);
      return idClase;
    }
    throw {code: "ER_NO_ID_JORNADA"};
  }

  async consultar(elem){
    var claseresult = await this.#transaccionClase.consultar(elem);
    return await this.formatoClase(claseresult, true);
  }

  async modificar(elem){
    var disponible = await this.#transaccionClase.mostrarJornadasDisponibles(elem);
    var intervalosClase = await this.#transaccionClase.mostrarIntervalosClase(elem);
    if("aplicarTodas" in elem){
      var listaIntervalos = [];
      for(let jd of disponible){
        for(let ic of intervalosClase){
          if(jd.id_jornada == ic.id_jornada && 
            (ic.hora_inicio != elem.horaInicio || ic.hora_final != elem.horaFinal ||
              ic.minuto_inicio != elem.minutoInicio || ic.minuto_final != elem.minutoFinal)){
            listaIntervalos.push([
              ic.id_intervalo,
              elem.horaInicio,
              elem.horaFinal,
              elem.minutoInicio,
              elem.minutoFinal,
            ]);
          }
        }
      }
      if(listaIntervalos.length > 0){
        await this.#transaccionClase.modificarIntervalosClase(listaIntervalos);
      } else {
        throw {code:"ER_NO_DISPONIBLE"}
      }
    } else {
      if("idIntervalo" in elem){
        var r2 = null;
        for(let jd of disponible){
          for(let ic of intervalosClase){
            if(jd.id_jornada == ic.id_jornada && elem.idIntervalo == ic.id_intervalo){
              if(ic.hora_inicio != elem.horaInicio || ic.hora_final != elem.horaFinal ||
                ic.minuto_inicio != elem.minutoInicio || ic.minuto_final != elem.minutoFinal){
                  r2 = await this.#ctrlIntervaloTiempo.modificar(elem);
                } else{
                  r2 = true;
                }
              break;
            }
          }
        }
        if(r2 == null){
          throw {code:'ER_NO_DISPONIBLE'}
        }
      }
    }
    var r = await this.#transaccionClase.modificar(elem);
    return r;
  }

  async eliminar(elem){
    let r = await this.#transaccionClase.eliminar(elem);
    return r;
  }

  async eliminarEnJornada(elem){
    let r = await this.#transaccionClase.eliminarEnJornada(elem);
    return r;
  }

  async mostrarTodoXMes(elem){
    var listaclasesresult = await this.#transaccionClase.mostrarTodoXMes(elem);
    var i;
    var listaClases = [];
    for(i = 0; i < listaclasesresult.length; i++){
      var claseresult = listaclasesresult[i];
      var clase = await this.formatoClase(claseresult, false);
      listaClases.push(clase);
    }
    return listaClases;
  }

  async agregarInstructorTemporal(elem){
    let r =  await this.#transaccionClase.agregarInstructorTemporal(elem);
    return r;
  }

  async formatoClase(claseresult, conHorario){
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
    var horarios = [];
    if(conHorario){
      horarios = await this.mostrarHorariosClase(claseresult); 
    }
    var clase = this.agregaMemoria({
      id:claseresult.id_clase,
      capacidad:claseresult.capacidad,
      estado:claseresult.estado_clase,
      horarios,
      instructorTemporal,
      servicio,
      instructor,
      vistoPorInstructor:claseresult.visto_por_instructor
    });
    return clase;
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

  agregaMemoria(elem = {id:null,capacidad:null,estado:null,horarios:null,instructorTemporal:null,servicio:null,instructor:null,vistoPorInstructor:null}){
    if(!(elem.id in this.#clases)){
      this.#clases[elem.id] = new Clase(
        elem.id,
        elem.capacidad,
        elem.estado,
        elem.horarios,
        elem.instructorTemporal,
        elem.servicio,
        elem.instructor,
        elem.vistoPorInstructor);
    } else {
      let c = this.#clases[elem.id];
      if(elem.capacidad != null && c.getCapacidad() != elem.capacidad){
        c.setCapacidad(elem.capacidad);
      }
      if(elem.estado != null && c.getEstado() != elem.estado){
        c.setEstado(elem.estado);
      }
      if(elem.horarios != null){
        c.setHorarios(elem.horarios);
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
      if(elem.vistoPorInstructor != null  && c.getVistoPorInstructor() != elem.vistoPorInstructor){
        c.setVistoPorInstructor(elem.vistoPorInstructor);
      }
    }
    let condicion = this.#clases[elem.id].getEstado() === EstadoClase.PUBLICADA;
    this.notificarInstructor(this.#clases[elem.id], !condicion);
    this.notificarAdministradores(this.#clases[elem.id], condicion);
    return this.#clases[elem.id];
  }

  setStrategyRegistro(strategy){
    this.#strategyRegistro = strategy;
  }

  notificarInstructor(clase, elimina){
    var instructor = clase.getInstructor();
    instructor.actualizar(clase, elimina);
  }

  notificarAdministradores(clase, elimina){
    var administradores = this.#ctrlAdministrador.getAdministradores();
    for(let a in administradores){
      administradores[a].actualizar(clase, elimina);
    }
  }

  async publicarTodas(elem){
    var r = await this.#transaccionClase.modificarMuchas1Campo(
      elem.clases,
      "estado_clase",
      "'PUBLICADA'");
    for(let c of elem.clases){
      let clase = this.#clases[c];
      clase.setEstado(EstadoClase.PUBLICADA);
      this.notificarInstructor(clase, false);
      this.notificarAdministradores(clase, true);
    }
    return r;
  }

  async publicarClase(elem){
    elem.estado = EstadoClase.PUBLICADA;
    var r = await this.modificar(elem);
    let clase = this.#clases[elem.idClase];
    clase.setEstado(EstadoClase.PUBLICADA);
    this.notificarInstructor(clase, false);
    this.notificarAdministradores(clase, true);
    return r;
  }

  async marcarVistasInstructor(elem){
    var r = await this.#transaccionClase.modificarMuchas1Campo(
      elem.clases,
      "visto_por_instructor",
      "1");
    for(let c of elem.clases){
      let clase = this.#clases[c];
      clase.setVistoPorInstructor(1);
      this.notificarInstructor(clase, true);
    }
    return r;
  }

  async mostrarHorariosClase(elem){
    let valores = [];
    let horarios = await this.#transaccionClase.mostrarHorariosClase({idClase:elem.id_clase});
    for(let h of horarios){
      var intervaloTiempo = this.#ctrlIntervaloTiempo.agregaMemoria({
        id:h.id_intervalo,
        horaInicio:h.hora_inicio,
        minutoInicio:h.minuto_inicio,
        horaFinal:h.hora_final,
        minutoFinal:h.minuto_final
      });
      let matriculas = await this.#ctrlMatriculaClase.mostrarPersonasMatriculadas(elem.id_clase_jornada);
      var horario = this.agregaMemoriaHorarioClase({id:h.id_clase_jornada, idJornada:h.id_jornada, dia:h.dia, horario:intervaloTiempo, matriculas});
      valores.push(horario);
    }
    return valores;
  }

  agregaMemoriaHorarioClase(elem={id:null,idJornada:null,dia:null,horario:null,matriculas:null}){
    if(!(elem.id in this.#horariosClase)){
      this.#horariosClase[elem.id] = new HorarioClase(
        elem.id,
        elem.idJornada,
        elem.dia,
        elem.horario,
        elem.matriculas
        );
        this.#horariosClase[elem.id].get
    } else {
      let c = this.#horariosClase[elem.id];
      if(elem.dia != null && c.getDia() != elem.dia){
        c.setDia(elem.dia);
      }
      if(elem.horario != null && c.getHorario() != elem.horario){
        c.setHorario(elem.horario);
      }
      if(elem.matriculas != null){
        c.setMatriculas(elem.matriculas);
      }
    }
    return this.#horariosClase[elem.id];
  }

}

module.exports = ControllerClase;