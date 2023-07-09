CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;
CREATE TABLE IF NOT EXISTS hotel(
    hotelId INT NOT NULL AUTO_INCREMENT,
    direccion VARCHAR(255) NOT NULL,
    niveles INT NOT NULL,
    distrito VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    PRIMARY KEY (hotelId)
);
CREATE TABLE IF NOT EXISTS usuario(
    usuarioId INT NOT NULL AUTO_INCREMENT,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (usuarioId)
);
CREATE TABLE IF NOT EXISTS habitacion(
    habitacionId INT NOT NULL AUTO_INCREMENT,
    hotelId INT NOT NULL,
    nivel INT NOT NULL,
    aforo INT NOT NULL,
    camasPersonales INT NOT NULL,
    camasDoble INT NOT NULL,
    precio INT NOT NULL,
    PRIMARY KEY (habitacionId),
    FOREIGN KEY (hotelId) REFERENCES hotel (hotelId)
);
CREATE TABLE IF NOT EXISTS reserva(
    reservaId INT NOT NULL AUTO_INCREMENT,
    habitacionId INT NOT NULL,
    usuarioId INT NOT NULL,
    inicio DATE NOT NULL,
    fin DATE NOT NULL,
    PRIMARY KEY (reservaId),
    FOREIGN KEY (habitacionId) REFERENCES habitacion (habitacionId),
    FOREIGN KEY (usuarioId) REFERENCES usuario (usuarioId)
);