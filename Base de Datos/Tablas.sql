
CREATE SCHEMA sistemaentrenamiento;
SET GLOBAL validate_password_length = 4;
SET GLOBAL log_bin_trust_function_creators = 1;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

flush privileges;

use sistemaentrenamiento;

DROP TABLE IF EXISTS Clases_en_Jornada;
DROP TABLE IF EXISTS Jornada;
DROP TABLE IF EXISTS Intervalo_Tiempo;
DROP TABLE IF EXISTS Servicios_de_Sala;
DROP TABLE IF EXISTS Servicios_de_Instructor;
DROP TABLE IF EXISTS Pago;
DROP TABLE IF EXISTS Sala;
DROP TABLE IF EXISTS Matricula;
DROP TABLE IF EXISTS Clase;
DROP TABLE IF EXISTS Servicio;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Administrador;
DROP TABLE IF EXISTS Instructor;
DROP TABLE IF EXISTS Llaves;

CREATE TABLE Servicio(
	nombre_servicio VARCHAR(50) NOT NULL PRIMARY KEY,
    costo_matricula FLOAT
);

CREATE TABLE Intervalo_Tiempo(
	id_intervalo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hora_inicio INT NOT NULL,
    hora_final INT NOT NULL,
    minuto_inicio INT NOT NULL,
    minuto_final INT NOT NULL
);

CREATE TABLE Cliente(
	email VARCHAR(50) NOT NULL PRIMARY KEY,
    identificacion INT NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    contrasenna VARBINARY(256) NOT NULL,
    sal VARCHAR(16) NOT NULL,
    telefono INT NOT NULL
);

CREATE TABLE Administrador(
	email VARCHAR(50) NOT NULL PRIMARY KEY,
    contrasenna VARBINARY(256),
    sal VARCHAR(50)
);

CREATE TABLE Instructor(
	email VARCHAR(50) NOT NULL PRIMARY KEY,
    identificacion INT NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    contrasenna VARBINARY(256) NOT NULL,
    sal VARCHAR(16) NOT NULL,
    telefono INT NOT NULL
);

CREATE TABLE Llaves(
	email_usuario VARCHAR(50) NOT NULL PRIMARY KEY,
	llave VARBINARY(256) NOT NULL
);

CREATE TABLE Sala(
	id_sala INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    costo_matricula FLOAT NOT NULL,
    capacidad INT NOT NULL,
    aforo INT NOT NULL
);

CREATE TABLE Jornada(
	id_jornada INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dia DATE NOT NULL,
    id_intervalo_tiempo INT NOT NULL,
    id_sala INT NOT NULL,
    FOREIGN KEY (id_intervalo_tiempo) REFERENCES Intervalo_Tiempo(id_intervalo),
    FOREIGN KEY (id_sala) REFERENCES Sala(id_sala)
);

CREATE TABLE Clase(
	id_clase INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    capacidad INT NOT NULL,
    estado_clase VARCHAR(50) NOT NULL,
    nombre_servicio VARCHAR(50) NOT NULL,
    email_instructor VARCHAR(50) NOT NULL,
    email_instructor_temporal VARCHAR(50),
    FOREIGN KEY (nombre_servicio) REFERENCES Servicio(nombre_servicio),
    FOREIGN KEY (email_instructor) REFERENCES Instructor(email),
    FOREIGN KEY (email_instructor_temporal) REFERENCES Instructor(email)
);

CREATE TABLE Pago(
	id_pago INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    fecha DATE,
    email_usuario VARCHAR(50) NOT NULL,
    id_clase INT NOT NULL,
    estado_pago VARCHAR(50) NOT NULL,
    forma_pago VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_clase) REFERENCES Clase(id_clase),
    FOREIGN KEY (email_usuario) REFERENCES Cliente(email)
);

CREATE TABLE Servicios_de_Instructor(
	email_instructor VARCHAR(50) NOT NULL,
    nombre_servicio VARCHAR(50) NOT NULL,
    PRIMARY KEY(email_instructor, nombre_servicio),
    FOREIGN KEY (email_instructor) REFERENCES Instructor(email),
    FOREIGN KEY (nombre_servicio) REFERENCES Servicio(nombre_servicio)
);

CREATE TABLE Servicios_de_Sala(
	id_sala INT NOT NULL,
    nombre_servicio VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_sala, nombre_servicio),
    FOREIGN KEY (id_sala) REFERENCES Sala(id_sala),
    FOREIGN KEY (nombre_servicio) REFERENCES Servicio(nombre_servicio)
);

CREATE TABLE Clases_en_Jornada(
	id_clase INT NOT NULL,
    id_intervalo INT NOT NULL,
    id_jornada INT NOT NULL,
    PRIMARY KEY(id_clase, id_intervalo, id_jornada),
    FOREIGN KEY (id_clase) REFERENCES Clase(id_clase),
    FOREIGN KEY (id_intervalo) REFERENCES Intervalo_Tiempo(id_intervalo),
    FOREIGN KEY (id_jornada) REFERENCES Jornada(id_jornada)
);

CREATE TABLE Matricula(
	email_cliente VARCHAR(50) NOT NULL,
    id_clase INT NOT NULL,
    PRIMARY KEY(email_cliente, id_clase),
    FOREIGN KEY (email_cliente) REFERENCES Cliente(email),
    FOREIGN KEY (id_clase) REFERENCES Clase(id_clase)
);