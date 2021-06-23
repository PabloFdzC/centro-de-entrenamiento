const TransaccionSala = require("./TransaccionSala.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{
  #transaccionSala = null;
  #ctrlServicioSala = null;
  #ctrlJornada = null;
  #salas = null;
  
  constructor(ctrlServicioSala, ctrlJornada){
    this.#ctrlServicioSala = ctrlServicioSala;
    this.#ctrlJornada = ctrlJornada;
    this.#transaccionSala = new TransaccionSala();
    this.#salas = {};
  }

  async agregar(elem){
    elem.idSala = await this.#transaccionSala.agregar(elem);
    var r = await this.#ctrlServicioSala.agregarMultiples(elem);
    await this.#ctrlJornada.crearCalendario(elem.idSala, elem.calendario);
    return elem.idSala;
  }

  async consultar(id){
    var salaresult = await this.#transaccionSala.consultar(id);
    var listaJornadas = await this.#ctrlJornada.mostrarCalendario(salaresult.id_sala);
    var listaServicios = await this.#ctrlServicioSala.mostrarTodosXIdSala(salaresult.id_sala);
    var sala = this.agregaMemoria({
      id:salaresult.id_sala,
      capacidad:salaresult.capacidad,
      aforo:salaresult.aforo,
      costoMatricula:salaresult.costo_matricula,
      calendario:listaJornadas,
      servicios:listaServicios
    });
    return sala;
  }

  async modificar(elem){
    var result = await this.#transaccionSala.modificar(elem);
    await this.#ctrlServicioSala.agregarMultiples(elem);
    await this.#ctrlServicioSala.eliminarMultiples(elem);
    await this.#ctrlJornada.modificarCalendario(elem.idSala, elem.calendario, elem.calendarioE);
    return result;
  }

  async mostrarTodosSimple(){
    var salalistaresult = await this.#transaccionSala.mostrarTodos();
    var i;
    var listaSalas = [];
    for(i = 0; i < salalistaresult.length; i++){
      var salaresult = salalistaresult[i];
      var sala = this.agregaMemoria({
        id:salaresult.id_sala,
        capacidad:salaresult.capacidad,
        aforo:salaresult.aforo,
        costoMatricula:salaresult.costo_matricula
      });
      listaSalas.push(sala);
    }
    return listaSalas;
  }

  async mostrarTodos(){
    var salalistaresult = await this.mostrarTodosSimple();
    var mes = new Date().getMonth()+1;
    for(let salaresult of salalistaresult){
      var listaJornadas = await this.#ctrlJornada.mostrarCalendario({idSala:salaresult.getId(), mes});
      var listaServicios = await this.#ctrlServicioSala.mostrarTodosXIdSala(salaresult.getId());
      salaresult.setServicios(listaServicios);
      salaresult.setCalendario(listaJornadas);
    }
    return salalistaresult;
  }

  agregaMemoria(elem = {id:null,capacidad:null,aforo:null,costoMatricula:null,calendario:null,servicios:null}){
    if(!(elem.id in this.#salas)){
      this.#salas[elem.id] = new Sala(
        elem.id,
        elem.capacidad,
        elem.aforo,
        elem.costoMatricula,
        elem.calendario,
        elem.servicios);
    } else {
      let s = this.#salas[elem.id];
      if(elem.capacidad != null && s.getCapacidad() != elem.capacidad){
        s.setCapacidad(elem.capacidad);
      }
      if(elem.aforo != null && s.getAforo() != elem.aforo){
        s.setAforo(elem.aforo);
      }
      if(elem.costoMatricula != null && s.getCostoMatricula() != elem.costoMatricula){
        s.setCostoMatricula(elem.costoMatricula);
      }
      if(elem.calendario != null){
        s.setCalendario(elem.calendario);
      }
      if(elem.servicios != null){
        s.setServicios(elem.servicios);
      }
    }
    return this.#salas[elem.id];
  }

}

module.exports = ControllerSala;