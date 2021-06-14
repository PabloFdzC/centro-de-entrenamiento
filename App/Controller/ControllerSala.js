const ConexionSng = require("./ConexionBaseDatosSng.js");
const ConexionSala = ConexionSng.getConexionSala();
const Servicio = require("./../Model/Servicio.js");
const Clase = require("./../Model/Clase.js");
const Instructor = require("./../Model/Instructor.js");
const IntervaloTiempo = require("./../Model/IntervaloTiempo.js");
const Jornada = require("./../Model/Jornada.js");
const Sala = require("./../Model/Sala.js");

class ControllerSala{

  #ctrlInstructor;
  
  constructor(ctrlInstructor){
    this.#ctrlInstructor = ctrlInstructor;
  }

  async agregar(elem){
    var ctrlSala = this;
    try{
      var result = await ConexionSala.agregar(elem);
      await ctrlSala.crearServiciosDeSala(result[0][0].id_sala, elem.servicios);
      await ctrlSala.crearCalendario(result[0][0].id_sala, elem.calendario);
      return result;
    }catch(err){
      throw err;
    }
  }

  async serviciosDeSala(id){
    try{
      var result = await serviciosDeSala.agregar(id);
      var listaserviciosresult = result[0];
      var i;
      var listaServicios = [];
      for(i = 0; i < listaserviciosresult.length; i++){
        var servicioresult = listaserviciosresult[i];
        var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
        listaServicios.push(servicio);
      }
      return listaServicios;
    }catch(err){
      throw err;
    }
  }

  async consultar(id){
    var ctrlSala= this;
    try{
      var result = await serviciosDeSala.agregar(id);
      var salaresult = result[0][0];
      var listaJornadas = await ctrlSala.jornadasDeSala(salaresult.id_sala);
      var listaServicios = await ctrlSala.serviciosDeSala(salaresult.id_sala);
      var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
      return sala;
    }catch(err){
      throw err;
    }
  }

  async consultarSalas(){
    var ctrlSala = this;
    try{
      var result = await ConexionSala.consultarSalas();
      var salalistaresult = result[0];
      var i;
      var listaSalas = [];
      for(i = 0; i < salalistaresult.length; i++){
        var salaresult = salalistaresult[i];
        var listaJornadas = await ctrlSala.jornadasDeSala(salaresult.id_sala);
        var listaServicios = await ctrlSala.serviciosDeSala(salaresult.id_sala);
        var sala = new Sala(salaresult.id_sala, salaresult.capacidad, salaresult.aforo, salaresult.costo_matricula, listaJornadas, listaServicios);
        listaSalas.push(sala);
      }
      return listaSalas;
    }catch(err){
      throw err;
    }
  }

  async modificar(elem){
    var ctrlSala = this;
    try{
      var result = await ConexionSala.agregar(elem);
      ctrlSala.modificarServiciosDeSala(elem.idSala, elem.serviciosE, elem.serviciosA);
      ctrlSala.modificarCalendario(elem.idSala, elem.calendarioA, elem.calendarioE);
      return result;
    }catch(err){
      throw err;
    }
  }

  //elem es una lista
  async crearCalendario(id, elem){
    if(elem.length > 0){
      var ctrlSala = this;
      try{
        var result = await ConexionSala.crearCalendario(elem[0]);
        var r = await ctrlSala.crearCalendarioAux(id, elem, result);
        return r;
      }catch(err){
        throw err;
      }
    } else{
      err = {code: 0};
      throw err;
    }
  }

  async crearCalendarioAux(id, elem, result){
    var ctrlSala = this;
    return new Promise(function(resolve, reject){
      if(!result[0][0].id_intervalo){
        reject(result);
      }
      var id_primer_intervalo = result[0][0].id_intervalo;
      var sql = "INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final) VALUES ?";
      var values = [];
      var i;
      var value;
      for(i = 0; i < elem.length; i++){
        value = [elem[i].horaInicio, elem[i].horaFinal, elem[i].minutoInicio, elem[i].minutoFinal];
        values.push(value);
      }
      connection.query(sql,[values], async function(error, result){
        if(error){
          reject(error);
        }else{
          try{
            var r = await ctrlSala.crearCalendarioAux2(id,elem, id_primer_intervalo)
            resolve(r);
          }catch(err){
            reject(err);
          }
        }
      });
    });
  }

  crearCalendarioAux2(id,elem, id_primer_intervalo){
    var values = [];
    var mes;
    var nuevoDia;
    var mismoMes;
    var j;
    for(var i = 0; i < elem.length; i++){
      var dia = new Date(elem[i].dia);
      mes = dia.getMonth();
      if(elem[i].repeticion == "CADASEMANADELMES"){
        j = 7;
        while(dia.getDate() - j > 0){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(dia.getDate() - j);
          values.push([nuevoDia, id_primer_intervalo + i, id]);
          j += 7;
        }
        j = 0;
        mismoMes = true;
        while(mismoMes){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(dia.getDate() + j);
          if(nuevoDia.getMonth() == mes){
            values.push([nuevoDia, id_primer_intervalo + i, id]);
          }
          else{
            mismoMes = false;
          }
          j += 7;
        }
      }
      else if(elem[i].repeticion == "TODOSLOSDIASDELMES"){
        mismoMes = true;
        j = 1;
        while(mismoMes){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(j);
          if(nuevoDia.getMonth() == mes){
            values.push([nuevoDia, id_primer_intervalo + i, id]);
          }
          else{
            mismoMes = false;
          }
          j += 1;
        }
      }
      else{
        values.push([elem[i].dia, id_primer_intervalo + i, id]);
      }
    }
    try{
      var result = await ConexionSala.crearCalendarioAux2(values);
      return result;
    }catch(err){
      throw err;
    }
  }

  modificarCalendario(id, calendarioA, calendarioE){
    var values = [];
    var i;
    var value;
    for(i = 0; i < calendarioE.length; i++){
      value = [calendarioE[i]];
      values.push(value);
    }
    try{
      var result = await ConexionSala.modificarCalendario(values);
      var r = await ctrlSala.modificarCalendarioAux(id, calendarioA, calendarioE, result);
      return r;
    }catch(err){
      throw err;
    }
  }

  modificarCalendarioAux(id, calendarioA, calendarioE, result){
    try{
      var result = await ConexionSala.modificarCalendarioAux(calendarioA[0]);
      var r = await ctrlSala.modificarCalendarioAux2(id, calendarioA, calendarioE, result);
      return r;
    }catch(err){
      throw err;
    }
  }
  
  modificarCalendarioAux2(id, calendarioA, calendarioE, result){
    if(!result.id_intervalo){
      reject(result);
    }
    var values = [];
    var i;
    var value;
    for(i = 1; i < calendarioA.length; i++){
      value = [calendarioA[i].horaInicio, calendarioA[i].horaFinal, calendarioA[i].minutoInicio, calendarioA[i].minutoFinal];
      values.push(value);
    }
    try{
      var result = await ConexionSala.modificarCalendarioAux2(values);
      var r = await ctrlSala.modificarCalendarioAux3(id, calendarioA, calendarioE, result);
      return r;
    }catch(err){
      throw err;
    }
  }

  modificarCalendarioAux3(id, calendarioA, calendarioE){
    var id_primer_intervalo = result.id_intervalo;
    values = [];
    var mes;
    var nuevoDia;
    var mismoMes;
    var j;
    for(i = 0; i < calendarioA.length; i++){
      mes = calendarioA[i].dia.getMonth();
      if(calendarioA[i].repeticion == "CADASEMANADELMES"){
        j = 7;
        while(dia.getDate() - j > 0){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(dia.getDate() - j);
          values.push([nuevoDia, id_primer_intervalo + i, id]);
          j += 7;
        }
        j = 0;
        mismoMes = true;
        while(mismoMes){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(dia.getDate() + j);
          if(nuevoDia.getMonth() == mes){
            values.push([nuevoDia, id_primer_intervalo + i, id]);
          }
          else{
            mismoMes = false;
          }
          j += 7;
        }
      }
      else if(calendarioA[i].repeticion == "TODOSLOSDIASDELMES"){
        mismoMes = true;
        j = 1;
        while(mismoMes){
          nuevoDia = new Date();
          nuevoDia.setMonth(dia.getMonth());
          nuevoDia.setFullYear(dia.getFullYear());
          nuevoDia.setDate(j);
          if(nuevoDia.getMonth() == mes){
            values.push([nuevoDia, id_primer_intervalo + i, id]);
          }
          else{
            mismoMes = false;
          }
          j += 1;
        }
      }
      else{
        values.push([calendarioA[i].dia, id_primer_intervalo + i, id]);
      }
    }
    try{
      var result = await ConexionSala.modificarCalendarioAux3(values);
      return result;
    }catch(err){
      throw err;
    }
  }

  async serviciosDeSala(id){
    try{
      var result = await ConexionSala.serviciosDeSala(id);
      var listaserviciosresult = result[0];
      var i;
      var listaServicios = [];
      for(i = 0; i < listaserviciosresult.length; i++){
        var servicioresult = listaserviciosresult[i];
        var servicio = new Servicio(servicioresult.nombre_servicio, servicioresult.costo_matricula);
        listaServicios.push(servicio);
      }
      return listaServicios;
    }catch(err){
      throw err;
    }
  }

  async jornadasDeSala(id){
    var ctrlSala = this;
    try{
      var result = await ConexionSala.jornadasDeSala(id);
      var listajornadasresult = result[0];
      var i;
      var listajornadas =[];
      for(i = 0; i < listajornadasresult.length; i++){
        var jornadaresult = listajornadasresult[i];
        var intervalo = new IntervaloTiempo(jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
        var listaclases = await ctrlSala.clasesDeJornada(jornadaresult.id_jornada);
        var jornada = new Jornada(jornadaresult.id_jornada, jornadaresult.dia, intervalo, listaclases);
        listajornadas.push(jornada);
      }
      return listajornadas;
    }catch(err){
      throw err;
    }
  }

  async jornadasDeMes(mes){
    var ctrlSala = this;
    try{
      var result = await ConexionSala.jornadasDeMes(id);
      var listajornadasresult = result[0];
      var i;
      var listajornadas =[];
      for(i = 0; i < listajornadasresult.length; i++){
        var jornadaresult = listajornadasresult[i];
        var intervalo = new IntervaloTiempo(jornadaresult.hora_inicio, jornadaresult.minuto_inicio, jornadaresult.hora_final, jornadaresult.minuto_final);
        var listaclases = await ctrlSala.clasesDeJornada(jornadaresult.id_jornada);
        var jornada = new Jornada(jornadaresult.id_jornada, jornadaresult.dia, intervalo, listaclases);
        listajornadas.push(jornada);
      }
      return listajornadas;
    }catch(err){
      throw err;
    }
  }

  async clasesDeJornada(id){
    var ctrlInstr = this.#ctrlInstructor;
    try{
      var result = await ConexionSala.clasesDeJornada(id);
      var listaclasesresult = result[0];
      var i;
      var listaClases = [];
      for(i = 0; i < listaclasesresult.length; i++){
        var claseresult = listaclasesresult[i];
        //var listaServiciosInstructor = serviciosDeInstructor(claseresult.email);
        var instructor = new Instructor(claseresult.primer_nombre, claseresult.segundo_nombre, claseresult.primer_apellido, claseresult.segundo_apellido, claseresult.fecha_nacimiento, claseresult.telefono, claseresult.email, claseresult.identificacion, null);
        var instructor_temporal = claseresult.email_instructor_temporal;
        if(instructor_temporal){
          instructor_temporal = await ctrlInstr.getInstructor(claseresult.email_instructor_temporal);
        }
        var servicio = new Servicio(claseresult.nombre_servicio, claseresult.costo_matricula);
        var intervalo = new IntervaloTiempo(claseresult.hora_inicio, claseresult.minuto_inicio, claseresult.hora_final, claseresult.minuto_final);
        //var matriculas = getMatriculasClase(claseresult.id_clase);
        var clase = new Clase(claseresult.id_clase, claseresult.capacidad, claseresult.estado_clase, intervalo, instructor_temporal, servicio, instructor, null);
        listaClases.push(clase);
      }
      return listaClases;
    }catch(err){
      throw err;
    }
  }

  //servicios es una lista
  crearServiciosDeSala(id, servicios){
    try{
      var values = [];
      var i;
      var value;
      for(i = 0; i < servicios.length; i++){
        value = [id, servicios[i]];
        values.push(value);
      }
      var result = await ConexionSala.crearServiciosDeSala(values);
      return result;
    }catch(err){
      throw err;
    }
  }

  modificarServiciosDeSala(id, serviciosBorrar, servicios){
    try{
      var values = [];
      var i;
      var value;
      for(i = 0; i < serviciosBorrar.length; i++){
        value = [id, serviciosBorrar[i]];
        values.push(value);
      }
      var result = await ConexionSala.modificarServiciosDeSala(values);
      var values = [];
      for(i = 0; i < servicios.length; i++){
        value = [id, servicios[i]];
        values.push(value);
      }
      var result = await ConexionSala.modificarServiciosDeSalaAux(values);
      return result;
    }catch(err){
      throw err;
    }
  }

}

module.exports = ControllerSala;