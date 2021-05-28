
CREATE SCHEMA sistemaentrenamiento;

SET GLOBAL log_bin_trust_function_creators = 1;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

flush privileges;

CREATE TABLE Forma_Pago(
	id_forma_pago INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    forma_pago_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Estado_Pago(
	id_estado_pago INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estado_pago_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Estado_Clase(
	id_estado_clase INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estado_clase_nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Servicio(
	nombre_servicio VARCHAR(50) NOT NULL PRIMARY KEY,
    costo_matricula FLOAT NOT NULL
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
    contrasenna VARBINARY(256) NOT NULL,
    sal VARCHAR(16) NOT NULL,
    telefono INT NOT NULL
);

CREATE TABLE Pago(
	id_pago INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    fecha DATE,
    id_forma_pago INT,
    id_estado_pago INT NOT NULL,
    email_usuario VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_forma_pago) REFERENCES Forma_Pago(id_forma_pago),
    FOREIGN KEY (id_estado_pago) REFERENCES Estado_Pago(id_estado_pago),
    FOREIGN KEY (email_usuario) REFERENCES Cliente(email)
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
    costo_matricula INT NOT NULL,
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
    id_estado INT NOT NULL,
    nombre_servicio VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES Estado_Clase(id_estado_clase),
    FOREIGN KEY (nombre_servicio) REFERENCES Servicio(nombre_servicio)
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