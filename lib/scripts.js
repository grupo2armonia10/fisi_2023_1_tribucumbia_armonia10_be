const mysql = require("mysql2");
const { config } = require("../config/conf");

// const conecction = mysql.createConnection({
//     host: config.dbHost,
//     user: config.dbUser,
//     password: config.dbPassword,
//     database: config.dbName,
// });

const conecction = mysql.createConnection({
    user: config.dbUser,
    host: config.dbHost,
    password: config.dbPassword,
    database: config.dbName,
});

const getReservasHabitacion = (habitacionId) => {
    return new Promise((resolve, reject) => {
        conecction.query(`CALL getReservasHabitacion(${habitacionId})`, (err, results) => {
            if (err) return console.error(err.message);
            resolve(results[0]);
        });
    });
};

const getReservasUsuario = (usuarioId) => {
    console.log(config);
    return new Promise((resolve, reject) => {
        conecction.query(`CALL getReservasUsuario(${usuarioId})`, (err, results) => {
            if (err) return console.error(err.message);
            resolve(results[0]);
        });
    });
};

const verificarReserva = async (solicitudReserva) => {
    const reservas = await getReservasHabitacion(solicitudReserva.habitacionId);
    //Buscamos reservas cruzadas, falso indica que no hay reservas cruzadas
    const dateinicio = new Date(solicitudReserva.inicio + "T00:00");
    const datefin = new Date(solicitudReserva.fin + "T00:00");

    const flag1 = reservas.some((reserva) => {
        return !(dateinicio < reserva.inicio) || !(datefin < reserva.inicio);
    });

    const flag2 = reservas.some((reserva) => {
        return !(dateinicio > reserva.fin) || !(datefin > reserva.fin);
    });

    return !(flag1 && flag2);
};

const getConstancia = async (reservaId) => {
    const sql = `SELECT reserva.inicio, reserva.fin, habitacion.nivel, habitacion.camasDoble, habitacion.camasPersonales, habitacion.precio, hotel.direccion, hotel.distrito, hotel.ciudad, usuario.nombres, usuario.apellidos, usuario.correo, usuario.telefono FROM reserva, habitacion, hotel, usuario WHERE reserva.reservaId = ${reservaId} AND habitacion.habitacionId = reserva.habitacionId AND hotel.hotelId = habitacion.hotelId AND reserva.usuarioID = usuario.usuarioID;`;

    return new Promise((resolve, reject) => {
        conecction.query(sql, (err, results) => {
            if (err) return console.error(err.message);
            resolve(results[0]);
        });
    });
};

const getReservaId = async (habitacionId, inicio, fin) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT reserva.reservaId FROM reserva WHERE habitacionId = ${habitacionId}  AND inicio = "${inicio}" AND fin = "${fin}"`;
        console.log(sql);
        conecction.query(sql, (err, results) => {
            if (err) return console.error(err.message);
            resolve(results[0]);
        });
    });
};

module.exports = { getReservasHabitacion, getReservasUsuario, verificarReserva, getConstancia, getReservaId };

//SELECT reserva.inicio, reserva.fin, habitacion.nivel, habitacion.camasDoble, habitacion.camasPersonales, habitacion.precio, hotel.direccion, hotel.distrito, hotel.ciudad, usuario.nombres, usuario.apellidos, usuario.correo, usuario.telefono FROM reserva, habitacion, hotel, usuario WHERE reserva.reservaId = 1 AND habitacion.habitacionId = reserva.habitacionId AND hotel.hotelId = habitacion.hotelId AND reserva.usuarioID = usuario.usuarioID;
