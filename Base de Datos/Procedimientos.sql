DROP PROCEDURE IF EXISTS CrearSala;
DELIMITER //

CREATE PROCEDURE CrearSala(IN piCostoMatricula INT, IN piCapacidad INT, IN piAforo INT)
BEGIN
	INSERT INTO Sala(costo_matricula, capacidad, aforo)
	VALUES(piCostoMatricula, piCapacidad, piAforo);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_sala;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EditarSala;
DELIMITER //

CREATE PROCEDURE EditarSala(IN piIdSala INT, IN piCostoMatricula INT, IN piCapacidad INT, IN piAforo INT)
BEGIN
	UPDATE Sala
    SET costo_matricula = piCostoMatricula, capacidad = piCapacidad, aforo = piAforo
    WHERE id_sala = piIdSala;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS SelectSala;
DELIMITER //

CREATE PROCEDURE SelectSala(IN piIdSala INT)
BEGIN
	SELECT id_sala, costo_matricula, capacidad, aforo
    FROM Sala
    WHERE id_sala = piIdSala;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS SelectSalas;
DELIMITER //

CREATE PROCEDURE SelectSalas()
BEGIN
	SELECT id_sala, costo_matricula, capacidad, aforo
    FROM Sala;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearIntervaloTiempo;
DELIMITER //

CREATE PROCEDURE CrearIntervaloTiempo(IN piHoraInicio INT, IN piHoraFinal INT, IN piMinutoInicio INT, IN piMinutoFinal INT)
BEGIN
	INSERT INTO Intervalo_Tiempo(hora_inicio, hora_final, minuto_inicio, minuto_final)
	VALUES(piHoraInicio, piHoraFinal, piMinutoInicio, piMinutoFinal);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_intervalo;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarIntervaloTiempo;
DELIMITER //

CREATE PROCEDURE EliminarIntervaloTiempo(IN piIdIntervaloTiempo INT)
BEGIN
	DELETE FROM Intervalo_Tiempo
    WHERE id_intervalo = piIdIntervaloTiempo;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS SelectIntervaloTiempo;
DELIMITER //

CREATE PROCEDURE SelectIntervaloTiempo(IN piIdIntervaloTiempo INT)
BEGIN
	SELECT id_intervalo, hora_inicio, hora_final, minuto_inicio, minuto_final
    FROM Intervalo_Tiempo
    WHERE id_intervalo = piIdIntervaloTiempo;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearJornada;
DELIMITER //

CREATE PROCEDURE CrearJornada(IN pdDia DATE, IN piIdIntervaloTiempo INT, IN piIdSala INT)
BEGIN
	INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala)
	VALUES(pdDia, piIdIntervaloTiempo, piIdSala);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_jornada;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearJornadaCalendario;
DELIMITER //

CREATE PROCEDURE CrearJornadaCalendario(IN pdDia DATE, IN piIdSala INT)
BEGIN
	INSERT INTO Jornada(dia, id_intervalo_tiempo, id_sala)
	VALUES(pdDia, LAST_INSERT_ID(), piIdSala);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_jornada;
END //

DELIMITER ;
DROP PROCEDURE IF EXISTS GetJornadasDeSala;
DROP PROCEDURE IF EXISTS GetJornadasSalaMes;
DROP PROCEDURE IF EXISTS GetJornadasMes;
DELIMITER //

CREATE PROCEDURE GetJornadasSalaMes(IN piIdSala INT, IN piMes INT)
BEGIN
	SELECT j.id_jornada, j.dia, it.id_intervalo, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_final
    FROM (SELECT id_jornada, dia, id_intervalo_tiempo
		FROM Jornada
		WHERE id_sala = piIdSala AND MONTH(dia) = piMes) AS j
    INNER JOIN Intervalo_Tiempo it
    ON it.id_intervalo = j.id_intervalo_tiempo;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetCantidadClasesJornada;
DELIMITER //

CREATE PROCEDURE GetCantidadClasesJornada(IN piIdJornada INT)
BEGIN
	SELECT COUNT(id_jornada) AS cantidad_clases FROM Clases_en_Jornada WHERE id_jornada = piIdJornada;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetJornada;
DELIMITER //

CREATE PROCEDURE GetJornada(IN piIdJornada INT)
BEGIN
	SELECT j.id_jornada, j.dia, it.id_intervalo, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_final
    FROM Jornada AS j
    INNER JOIN Intervalo_Tiempo AS  it
    ON j.id_intervalo_tiempo = it.id_intervalo  WHERE j.id_jornada = piIdJornada;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EditarJornada;
DELIMITER //

CREATE PROCEDURE EditarJornada(IN piIdJornada INT, IN pdDia DATE, IN piIdIntervaloTiempo INT, IN piIdSala INT)
BEGIN
	UPDATE Jornada
    SET dia = pdDia, id_intervalo_tiempo = piIdIntervaloTiempo, id_sala = piIdSala
    WHERE id_jornada = piIdJornada;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarJornada;
DELIMITER //

CREATE PROCEDURE EliminarJornada(IN piIdJornada INT)
BEGIN
	DELETE FROM Jornada
    WHERE id_jornada = piIdJornada;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearServicio;
DELIMITER //

CREATE PROCEDURE CrearServicio(IN pvNombreServicio VARCHAR(50), IN pfCostoMatricula FLOAT)
BEGIN
	INSERT INTO Servicio(nombre_servicio, costo_matricula)
	VALUES(pvNombreServicio, pfCostoMatricula);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_servicio;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS ModificarServicio;
DELIMITER //

CREATE PROCEDURE ModificarServicio(IN pvNombreServicio VARCHAR(50), IN pfCostoMatricula FLOAT)
BEGIN
	UPDATE Servicio
    SET costo_matricula = pfCostoMatricula
    WHERE nombre_servicio = pvNombreServicio;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarServicio;
DELIMITER //

CREATE PROCEDURE EliminarServicio(IN pvNombreServicio VARCHAR(50))
BEGIN
	DELETE FROM Servicio
    WHERE nombre_servicio = pvNombreServicio;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetServicios;
DELIMITER //

CREATE PROCEDURE GetServicios()
BEGIN
	SELECT nombre_servicio, costo_matricula
	FROM Servicio;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS AgregarServicioASala;
DELIMITER //

CREATE PROCEDURE AgregarServicioASala(IN piIdSala INT, IN pvNombreServicio VARCHAR(50))
BEGIN
	INSERT INTO Servicios_de_Sala(id_sala, nombre_servicio)
	VALUES(piIdSala, pvNombreServicio);
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarServicioDeSala;
DELIMITER //

CREATE PROCEDURE EliminarServicioDeSala(IN piIdSala INT, IN pvNombreServicio VARCHAR(50))
BEGIN
	DELETE FROM Servicios_de_Sala
    WHERE id_sala = piIdSala AND nombre_servicio = pvNombreServicio;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetServiciosDeSala;
DELIMITER //

CREATE PROCEDURE GetServiciosDeSala(IN piIdSala INT)
BEGIN
	SELECT id_sala, nombre_servicio
	FROM Servicios_de_Sala
	WHERE id_sala = piIdSala;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS AgregarServicioAInstructor;
DELIMITER //

CREATE PROCEDURE AgregarServicioAInstructor(IN pvEmailInstructor VARCHAR(50), IN pvNombreServicio VARCHAR(50))
BEGIN
	INSERT INTO Servicios_de_Instructor(email_instructor, nombre_servicio)
	VALUES(pvEmailInstructor, pvNombreServicio);
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarServicioAInstructor;
DELIMITER //

CREATE PROCEDURE EliminarServicioAInstructor(IN pvEmailInstructor VARCHAR(50), IN pvNombreServicio VARCHAR(50))
BEGIN
	DELETE FROM Servicios_de_Instructor
    WHERE email_instructor = pvEmailInstructor AND nombre_servicio = pvNombreServicio;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetServiciosDeInstructor;
DELIMITER //

CREATE PROCEDURE GetServiciosDeInstructor(IN pvEmailInstructor VARCHAR(50))
BEGIN
	SELECT sdi.email_instructor, sdi.nombre_servicio, s.costo_matricula 
    FROM (SELECT email_instructor, nombre_servicio
	FROM Servicios_de_Instructor
	WHERE email_instructor = pvEmailInstructor) AS sdi
    INNER JOIN Servicio s
    ON s.nombre_servicio = sdi.nombre_servicio;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS RegistroCliente;
DELIMITER //

CREATE PROCEDURE RegistroCliente(IN pvEmail VARCHAR(50), IN piIdentificacion INT, IN pvPrimerNombre VARCHAR(50), IN pvSegundoNombre VARCHAR(50), IN pvPrimerApellido VARCHAR(50), IN pvSegundoApellido VARCHAR(50), IN pdFechaNacimiento DATE, IN pvContrasenna VARCHAR(25), IN piTelefono INT)
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    INSERT INTO Cliente(email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, contrasenna, sal, telefono)
    VALUES (pvEmail, piIdentificacion, pvPrimerNombre, pvSegundoNombre, pvPrimerApellido, pvSegundoApellido, pdFechaNacimiento, aes_encrypt(pvContrasenna, nuevaLlave), nuevaSal, piTelefono);
    INSERT INTO Llaves(email_usuario, llave)
    VALUES (pvEmail, aes_encrypt(nuevaLlave, nuevaSal));
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS RegistroInstructor;
DELIMITER //

CREATE PROCEDURE RegistroInstructor(IN pvEmail VARCHAR(50), IN piIdentificacion INT, IN pvPrimerNombre VARCHAR(50), IN pvSegundoNombre VARCHAR(50), IN pvPrimerApellido VARCHAR(50), IN pvSegundoApellido VARCHAR(50), IN pdFechaNacimiento DATE, IN pvContrasenna VARCHAR(25), IN piTelefono INT)
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    INSERT INTO Instructor(email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, contrasenna, sal, telefono)
    VALUES (pvEmail, piIdentificacion, pvPrimerNombre, pvSegundoNombre, pvPrimerApellido, pvSegundoApellido, pdFechaNacimiento, aes_encrypt(pvContrasenna, nuevaLlave), nuevaSal, piTelefono);
    INSERT INTO Llaves(email_usuario, llave)
    VALUES (pvEmail, aes_encrypt(nuevaLlave, nuevaSal));
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS RegistroAdministrador;
DELIMITER //

CREATE PROCEDURE RegistroAdministrador(IN pvEmail VARCHAR(50), IN pvContrasenna VARCHAR(25))
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    INSERT INTO Administrador(email, contrasenna, sal)
    VALUES (pvEmail, aes_encrypt(pvContrasenna, nuevaLlave), nuevaSal);
    INSERT INTO Llaves(email_usuario, llave)
    VALUES (pvEmail, aes_encrypt(nuevaLlave, nuevaSal));
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarCliente;
DELIMITER //

CREATE PROCEDURE modificarCliente(IN pvEmail VARCHAR(50), IN piIdentificacion INT, IN pvPrimerNombre VARCHAR(50), IN pvSegundoNombre VARCHAR(50), IN pvPrimerApellido VARCHAR(50), IN pvSegundoApellido VARCHAR(50), IN pdFechaNacimiento DATE, IN piTelefono INT)
BEGIN
	UPDATE Cliente
    SET identificacion = piIdentificacion, primer_nombre = pvPrimerNombre, segundo_nombre = pvSegundoNombre, primer_apellido = pvPrimerApellido, segundo_apellido = pvSegundoApellido, fecha_nacimiento = pdFechaNacimiento, telefono = piTelefono
    WHERE email = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarInstructor;
DELIMITER //

CREATE PROCEDURE modificarInstructor(IN pvEmail VARCHAR(50), IN piIdentificacion INT, IN pvPrimerNombre VARCHAR(50), IN pvSegundoNombre VARCHAR(50), IN pvPrimerApellido VARCHAR(50), IN pvSegundoApellido VARCHAR(50), IN pdFechaNacimiento DATE, IN piTelefono INT)
BEGIN
	UPDATE Instructor
    SET identificacion = piIdentificacion, primer_nombre = pvPrimerNombre, segundo_nombre = pvSegundoNombre, primer_apellido = pvPrimerApellido, segundo_apellido = pvSegundoApellido, fecha_nacimiento = pdFechaNacimiento, telefono = piTelefono
    WHERE email = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS eliminarInstructor;
DELIMITER //

CREATE PROCEDURE eliminarInstructor(IN pvEmail VARCHAR(50))
BEGIN
    DELETE FROM Servicios_de_Instructor
    WHERE email_instructor = pvEmail;
    DELETE FROM Instructor
    WHERE email = pvEmail;
    DELETE FROM Llaves
    WHERE email_usuario = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarContrasennaCliente;
DELIMITER //

CREATE PROCEDURE modificarContrasennaCliente(IN pvEmail VARCHAR(50), IN pvContrasenna VARCHAR(25))
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    UPDATE Llaves
    SET llave = aes_encrypt(nuevaLlave, nuevaSal)
    WHERE email_usuario = pvEmail;
	UPDATE Cliente
    SET contrasenna = aes_encrypt(pvContrasenna, nuevaLlave), sal = nuevaSal
    WHERE email = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarContrasennaInstructor;
DELIMITER //

CREATE PROCEDURE modificarContrasennaInstructor(IN pvEmail VARCHAR(50), IN pvContrasenna VARCHAR(25))
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    UPDATE Llaves
    SET llave = aes_encrypt(nuevaLlave, nuevaSal)
    WHERE email_usuario = pvEmail;
    UPDATE Instructor
    SET contrasenna = aes_encrypt(pvContrasenna, nuevaLlave), sal = nuevaSal
    WHERE email = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS modificarContrasennaAdministrador;
DELIMITER //

CREATE PROCEDURE modificarContrasennaAdministrador(IN pvEmail VARCHAR(50), IN pvContrasenna VARCHAR(25))
BEGIN
	DECLARE nuevaLlave VARCHAR(16);
    DECLARE nuevaSal VARCHAR(16);
    SET nuevaLlave = LEFT(UUID(), 16);
    SET nuevaSal = LEFT(UUID(), 16);
    UPDATE Llaves
    SET llave = aes_encrypt(nuevaLlave, nuevaSal)
    WHERE email_usuario = pvEmail;
    UPDATE Administrador
    SET contrasenna = aes_encrypt(pvContrasenna, nuevaLlave), sal = nuevaSal
    WHERE email = pvEmail;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetCliente;
DELIMITER //

CREATE PROCEDURE GetCliente(IN pvEmail VARCHAR(50))
BEGIN
	SELECT email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, telefono
    FROM Cliente
    WHERE email = pvEmail;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClientes;
DELIMITER //

CREATE PROCEDURE GetClientes()
BEGIN
	SELECT email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, telefono
    FROM Cliente;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetInstructores;
DELIMITER //

CREATE PROCEDURE GetInstructores()
BEGIN
	SELECT email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, telefono
    FROM Instructor;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetInstructor;
DELIMITER //

CREATE PROCEDURE GetInstructor(IN pvEmail VARCHAR(50))
BEGIN
	SELECT email, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, telefono
    FROM Instructor
    WHERE email = pvEmail;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS LogIn;
DELIMITER //

CREATE PROCEDURE LogIn(IN pvEmail VARCHAR(50), IN pvContrasenna VARCHAR(25))
BEGIN
	DECLARE contrasennaEncriptada VARBINARY(255);
    DECLARE contrasennaDesencriptada VARCHAR(25);
    DECLARE laSal VARCHAR(16);
    DECLARE LlaveEncriptada VARBINARY(255);
    DECLARE laLlave VARCHAR(16);
	DECLARE usuarioExiste INT;
    SELECT Count(*) INTO usuarioExiste FROM Instructor
    WHERE email = pvEmail;
    IF usuarioExiste = 1 THEN
		SELECT contrasenna INTO contrasennaEncriptada FROM Instructor 
        WHERE email = pvEmail;
        SELECT sal INTO LaSal FROM Instructor 
        WHERE email = pvEmail;
        SELECT llave INTO LlaveEncriptada FROM Llaves 
        WHERE email_usuario = pvEmail;
        SET laLlave = CAST(aes_decrypt(LlaveEncriptada, LaSal) AS CHAR(50));
        SET contrasennaDesencriptada = CAST(aes_decrypt(contrasennaEncriptada, laLlave) AS CHAR(50));
        IF pvContrasenna = contrasennaDesencriptada THEN
			SELECT email, "Instructor" AS tipo_usuario
            FROM Instructor
            WHERE email = pvEmail;
        ELSE
			SELECT 'Email o contraseña incorrecta' AS error_message;
        END IF;
    ELSE 
		SELECT Count(*) INTO usuarioExiste FROM Cliente
		WHERE email = pvEmail;
		IF usuarioExiste = 1 THEN
			SELECT contrasenna INTO contrasennaEncriptada FROM Cliente 
			WHERE email = pvEmail;
			SELECT sal INTO LaSal FROM Cliente 
			WHERE email = pvEmail;
			SELECT llave INTO LlaveEncriptada FROM Llaves 
			WHERE email_usuario = pvEmail;
			SET laLlave = CAST(aes_decrypt(LlaveEncriptada, LaSal) AS CHAR(50));
			SET contrasennaDesencriptada = CAST(aes_decrypt(contrasennaEncriptada, laLlave) AS CHAR(50));
			IF pvContrasenna = contrasennaDesencriptada THEN
				SELECT email, "Cliente" AS tipo_usuario
				FROM Cliente
				WHERE email = pvEmail;
			ELSE
				SELECT 'Email o contraseña incorrecta' AS error_message;
			END IF;
		ELSE 
			SELECT Count(*) INTO usuarioExiste FROM Administrador
			WHERE email = pvEmail;
			IF usuarioExiste = 1 THEN
				SELECT contrasenna INTO contrasennaEncriptada FROM Administrador 
				WHERE email = pvEmail;
				SELECT sal INTO LaSal FROM Administrador 
				WHERE email = pvEmail;
				SELECT llave INTO LlaveEncriptada FROM Llaves 
				WHERE email_usuario = pvEmail;
				SET laLlave = CAST(aes_decrypt(LlaveEncriptada, LaSal) AS CHAR(50));
				SET contrasennaDesencriptada = CAST(aes_decrypt(contrasennaEncriptada, laLlave) AS CHAR(50));
				IF pvContrasenna = contrasennaDesencriptada THEN
					SELECT email, "Administrador" AS tipo_usuario
					FROM Administrador
					WHERE email = pvEmail;
				ELSE
					SELECT 'Email o contraseña incorrecta' AS error_message;
				END IF;
			ELSE 
				SELECT 'Email o contraseña incorrecta' AS error_message;
			END IF;
		END IF;
	END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearClase;
DELIMITER //

CREATE PROCEDURE CrearClase(IN piCapacidad INT, IN pvNombreServicio VARCHAR(50), IN pvEstadoClase VARCHAR(50), IN pvEmailInstructor VARCHAR(50))
BEGIN
    DECLARE servicioInstructor INT;
    SELECT Count(*) INTO servicioInstructor FROM Servicios_de_Instructor
	WHERE email_instructor = pvEmailInstructor AND nombre_servicio = pvNombreServicio;
    IF servicioInstructor > 0 THEN
        INSERT INTO Clase(capacidad, estado_clase, nombre_servicio, email_instructor)
        VALUES(piCapacidad, pvEstadoClase, pvNombreServicio, pvEmailInstructor);
        COMMIT;
        SELECT LAST_INSERT_ID() AS id_clase;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El instructor no tiene ese servicio';
    END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetJornadasCrearClase;
DELIMITER //

CREATE PROCEDURE GetJornadasCrearClase(IN piIdSala INT, IN pdDia DATE, IN piHoraInicio INT, IN piHoraFinal INT, IN piMinutoInicio INT, IN piMinutoFinal INT)
BEGIN
	SELECT j.id_jornada, j.dia FROM Jornada AS j INNER JOIN Intervalo_Tiempo AS it ON j.id_intervalo_tiempo = it.id_intervalo WHERE j.id_sala = piIdSala AND MONTH(j.dia) = MONTH(pdDia) AND j.dia >= pdDia AND ((it.hora_inicio < piHoraInicio AND it.hora_final > piHoraFinal) OR  (it.hora_inicio = piHoraInicio AND it.minuto_inicio <= piMinutoInicio) OR (it.hora_final = piHoraFinal AND it.minuto_final >= piMinutoFinal));
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS ModificarClase;
DELIMITER //

CREATE PROCEDURE ModificarClase(IN piIdClase INT, IN piCapacidad INT, IN pvNombreServicio VARCHAR(50), IN pvEstadoClase VARCHAR(50), IN pvEmailInstructor VARCHAR(50))
BEGIN
    UPDATE Clase
    SET capacidad = piCapacidad, estado_clase = pvEstadoClase, nombre_servicio = pvNombreServicio, email_instructor = pvEmailInstructor
    WHERE id_clase = piIdClase;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS PublicarClase;
DELIMITER //

CREATE PROCEDURE PublicarClase(IN piIdClase INT, IN pvEstadoClase VARCHAR(50))
BEGIN
	UPDATE Clase
    SET estado_clase = pvEstadoClase
	WHERE id_clase = piIdClase;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS DeshabilitarClase;
DELIMITER //

CREATE PROCEDURE DeshabilitarClase(IN piIdClase INT, IN pvEstadoClase VARCHAR(50))
BEGIN
	UPDATE Clase
    SET estado_clase = pvEstadoClase
	WHERE id_clase = piIdClase;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS AgregarInstructorTemporal;
DELIMITER //

CREATE PROCEDURE AgregarInstructorTemporal(IN piIdClase INT, IN pvEmailInstructor VARCHAR(50))
BEGIN
	UPDATE Clase
    SET email_instructor = pvEmailInstructor
	WHERE id_clase = piIdClase;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClasesEstado;
DELIMITER //

CREATE PROCEDURE GetClasesEstado(IN pvEstadoClase VARCHAR(50))
BEGIN
	SELECT c.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_final, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono
    FROM (SELECT id_clase, capacidad, estado_clase, nombre_servicio, email_instructor, email_instructor_temporal
		FROM Clase
		WHERE estado_clase = pvEstadoClase) AS c
    INNER JOIN Clases_en_Jornada cej
    ON cej.id_clase = c.id_clase
    INNER JOIN Intervalo_Tiempo it
    ON it.id_intervalo = cej.id_intervalo
    INNER JOIN Instructor i
    ON i.email = c.email_instructor;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClasesMes;
DELIMITER //

CREATE PROCEDURE GetClasesMes(IN piMes INT, IN piIdSala INT)
BEGIN
	SELECT c.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono
    FROM (SELECT id_jornada
		FROM Jornada
		WHERE id_sala = piIdSala AND MONTH(dia) = piMes) AS j
    INNER JOIN Clase c
    ON c.id_clase = cej.id_clase
    INNER JOIN Instructor i
    ON i.email = c.email_instructor;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClase;
DELIMITER //

CREATE PROCEDURE GetClase(IN pvIdClase INT)
BEGIN
	SELECT c.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono
    FROM (SELECT id_clase, capacidad, estado_clase, nombre_servicio, email_instructor, email_instructor_temporal
		FROM Clase
		WHERE id_clase = pvIdClase) AS c
    INNER JOIN Instructor i
    ON i.email = c.email_instructor;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetHorarioClase;
DELIMITER //

CREATE PROCEDURE GetHorarioClase(IN piIdClase INT)
BEGIN
	SELECT cej.id_jornada, it.id_intervalo, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_final
    FROM Intervalo_Tiempo AS it
    INNER JOIN Clases_en_Jornada AS cej
    ON it.id_intervalo = cej.id_intervalo WHERE cej.id_clase = piIdClase;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClasesEnJornada;
DELIMITER //

CREATE PROCEDURE GetClasesEnJornada(IN piIdJornada INT)
BEGIN
	SELECT cej.id_jornada, c.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, it.id_intervalo, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_final, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono, s.costo_matricula
    FROM (SELECT id_clase_jornada, id_clase, id_intervalo, id_jornada
		FROM Clases_en_Jornada
		WHERE id_jornada = piIdJornada) AS cej
    INNER JOIN Clase c
    ON cej.id_clase = c.id_clase
    INNER JOIN Intervalo_Tiempo it
    ON it.id_intervalo = cej.id_intervalo
    INNER JOIN Instructor i
    ON i.email = c.email_instructor
    INNER JOIN Servicio s
    ON s.nombre_servicio = c.nombre_servicio;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS MatricularClase;
DELIMITER //

CREATE PROCEDURE MatricularClase(IN piIdClaseJornada INT, IN pvEmailCliente VARCHAR(50))
BEGIN
    DECLARE cantidadMatriculas INT;
    DECLARE capacidadSala INT;
    SELECT Count(*) INTO cantidadMatriculas
    FROM Matricula
    WHERE id_clase_jornada = piIdClaseJornada;
    SELECT FLOOR(s.capacidad*s.aforo/100) INTO capacidadSala
    FROM (SELECT id_clase_jornada, id_jornada
    FROM Clases_en_Jornada 
    WHERE id_clase_jornada = piIdClaseJornada) AS cej
    INNER JOIN Jornada j
    ON j.id_jornada = cej.id_jornada
    INNER JOIN Sala s
    ON s.id_sala = j.id_sala;
    IF capacidadSala > cantidadMatriculas THEN
        INSERT INTO Matricula(email_cliente, id_clase_jornada)
        VALUES(pvEmailCliente, piIdClaseJornada);
        COMMIT;
    ELSE 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La clase está llena';
    END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetClasesMatriculadas;
DELIMITER //

CREATE PROCEDURE GetClasesMatriculadas(IN pvEmailCliente VARCHAR(50))
BEGIN
	SELECT c.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_fina, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono
    FROM (SELECT email_cliente, id_clase_jornada
		FROM Matricula
		WHERE email_cliente = pvEmailCliente) AS m
    INNER JOIN Clases_en_Jornada cej
    ON cej.id_clase_jornada = m.id_clase_jornada
	INNER JOIN Clase c
    ON c.id_clase = cej.id_clase
    INNER JOIN Intervalo_Tiempo it
    ON it.id_intervalo = cej.id_intervalo
    INNER JOIN Instructor i
    ON i.email = c.email_instructor;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CancelarMatricula;
DELIMITER //

CREATE PROCEDURE CancelarMatricula(IN piIdClaseJornada INT, IN pvEmailCliente VARCHAR(50))
BEGIN
	DELETE FROM Matricula
    WHERE email_cliente = pvEmailCliente AND id_clase_jornada = piIdClaseJornada;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetMatriculasClase;
DELIMITER //

CREATE PROCEDURE GetMatriculasClase(IN piIdClaseJornada INT)
BEGIN
	SELECT c.email, c.primer_nombre, c.segundo_nombre, c.primer_apellido, c.segundo_apellido
    FROM (SELECT email_cliente, id_clase_jornada
		FROM Matricula
		WHERE id_clase_jornada = piIdClaseJornada) AS m
	INNER JOIN Cliente c
    ON c.email = m.email_cliente;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearPago;
DELIMITER //

CREATE PROCEDURE CrearPago(IN pvNombreServicios VARCHAR(50), IN piIdSala INT,IN pvEmailCliente VARCHAR(50), IN pvId_clase INT, IN pvEstadoPago VARCHAR(50))
BEGIN
    DECLARE costo FLOAT DEFAULT NULL;
    SELECT costo_matricula INTO costo FROM Servicio WHERE nombre_servicio = pvNombreServicios;
    IF(costo IS NULL) THEN
        SELECT costo_matricula INTO costo FROM Sala WHERE id_sala = piIdSala;
    END IF;
	INSERT INTO Pago(cantidad, estado_pago, email_usuario, id_clase)
	VALUES(costo, pvEstadoPago, pvEmailCliente, pvId_clase);
    COMMIT;
    SELECT LAST_INSERT_ID() AS id_pago;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS ModificarPago;
DELIMITER //

CREATE PROCEDURE ModificarPago(IN piIdPago INT, IN pvFormaPago VARCHAR(50), IN pvEstadoPago VARCHAR(50))
BEGIN
	UPDATE Pago
    SET estado_pago = pvEstadoPago, fecha = CURDATE(), forma_pago = pvFormaPago
	WHERE id_pago = piIdPago;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarPago;
DELIMITER //

CREATE PROCEDURE EliminarPago(IN piIdPago INT)
BEGIN
    DELETE FROM Pago
    WHERE id_pago = piIdPago;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS PagoMoroso;
DELIMITER //

CREATE PROCEDURE PagoMoroso(IN piIdPago INT, IN pvEstadoPago VARCHAR(50))
BEGIN
	UPDATE Pago
    SET estado_pago = pvEstadoPago
	WHERE id_pago = piIdPago;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS RealizarPago;
DELIMITER //

CREATE PROCEDURE RealizarPago(IN piIdPago INT, IN pvFormaPago VARCHAR(50), IN pvEstadoPago VARCHAR(50))
BEGIN
	UPDATE Pago
    SET id_estado_pago = 1, fecha = CURDATE(), forma_pago = pvFormaPago
	WHERE estado_pago = pvEstadoPago;
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetPagosPendientes;
DELIMITER //

CREATE PROCEDURE GetPagosPendientes(IN pvEmailCliente VARCHAR(50), IN pvEstadoPago VARCHAR(50))
BEGIN
	SELECT p.id_pago, p.cantidad, p.estado_pago, p.fecha, p.id_clase, c.capacidad, c.estado_clase, c.nombre_servicio, c.email_instructor_temporal, it.hora_inicio, it.hora_final, it.minuto_inicio, it.minuto_fina, i.email, i.identificacion, i.primer_nombre, i.segundo_nombre, i.primer_apellido, i.segundo_apellido, i.fecha_nacimiento, i.telefono, s.costo_matricula
    FROM (SELECT id_pago, cantidad, estado_pago, id_clase
    FROM Pago
    WHERE estado_pago = pvEstadoPago AND email_usuario = pvEmailCliente) AS p
	INNER JOIN Clase c
    ON c.id_clase = p.id_clase
    INNER JOIN Clases_en_Jornada cej
    ON cej.id_clase = p.id_clase
    INNER JOIN Intervalo_Tiempo it
    ON it.id_intervalo = cej.id_intervalo
    INNER JOIN Instructor i
    ON i.email = c.email_instructor
    INNER JOIN Servicio s
    ON s.nombre_servicio = c.nombre_servicio;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS ContarAdministradores;
DELIMITER //

CREATE PROCEDURE ContarAdministradores()
BEGIN
	SELECT COUNT(email) AS total
    FROM Administrador;
END //

DELIMITER ;