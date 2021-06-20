const TransaccionSala = require("./TransaccionSala.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{
  #transaccionSala = null;
  #ctrlServicioSala = null;
  #ctrlJornada = null;
  
  constructor(ctrlServicioSala, ctrlJornada){
    this.#ctrlServicioSala = ctrlServicioSala;
    this.#ctrlJornada = ctrlJornada;
    this.#transaccionSala = new TransaccionSala();
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
    var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
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
      var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, null, null);
      listaSalas.push(sala);
    }
    return listaSalas;
  }

  async mostrarTodos(){
    var salalistaresult = await this.mostrarTodosSimple();
    var mes = new Date().getMonth()+1;
    for(let salaresult of salalistaresult){
      console.log({id:salaresult.getId(), mes});
      var listaJornadas = await this.#ctrlJornada.mostrarCalendario({idSala:salaresult.getId(), mes});
      console.log(listaJornadas);
      var listaServicios = await this.#ctrlServicioSala.mostrarTodosXIdSala(salaresult.getId());
      salaresult.setServicios(listaServicios);
      salaresult.setCalendario(listaJornadas);
    }
    return salalistaresult;
  }

  

}

module.exports = ControllerSala;