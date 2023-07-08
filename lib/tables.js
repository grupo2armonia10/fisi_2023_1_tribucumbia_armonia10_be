const mysql = require("mysql2");
const { config } = require("../config/conf");
// const conecction = mysql.createConnection({
//     host: config.dbHost,
//     user: config.dbUser,
//     password: config.dbPassword,
//     database: config.dbName,
// });

const getAll = (table) => {
    return new Promise((resolve, reject) => {
        const conecction = mysql.createConnection({
            user: config.dbUser,
            host: config.dbHost,
            password: config.dbPassword,
            database: config.dbName,
        });

        conecction.query(`SELECT * FROM ${table}`, (err, results) => {
            if (err) return console.error(err.message);

            conecction.end();
            resolve(results);
        });
    });
};

const get = (table, id) => {
    return new Promise((resolve, reject) => {
        const conecction = mysql.createConnection({
            user: config.dbUser,
            host: config.dbHost,
            password: config.dbPassword,
            database: config.dbName,
        });

        conecction.query(`SELECT * FROM ${table} WHERE ${table + "ID"}=${id}`, (err, results) => {
            if (err) return console.error(err.message);

            conecction.end();
            resolve(results);
        });
    });
};

const deleteOne = (table, id) => {
    const conecction = mysql.createConnection({
        user: config.dbUser,
        host: config.dbHost,
        password: config.dbPassword,
        database: config.dbName,
    });

    conecction.query(`DELETE FROM ${table} WHERE ${table + "ID"}=${id}`, (err) => {
        if (err) return console.error(err.message);
        console.log(`${table} eliminado`);
        conecction.end();
    });
};

const create = async (table, entity) => {
    const conecction = mysql.createConnection({
        user: config.dbUser,
        host: config.dbHost,
        password: config.dbPassword,
        database: config.dbName,
    });

    let data = [];
    let valuesString = "";

    switch (table) {
        case "usuario":
            data = [entity.nombres, entity.apellidos, entity.correo, entity.telefono, entity.password];
            valuesString = "(nombres, apellidos, correo, telefono, password) VALUES(?,?,?,?,?)";
            break;

        case "hotel":
            data = [entity.direccion, entity.niveles, entity.distrito, entity.ciudad];
            valuesString = "(direccion, niveles, distrito, ciudad) VALUES(?,?,?,?)";
            break;

        case "reserva":
            data = [entity.habitacionId, entity.usuarioId, entity.inicio, entity.fin];
            valuesString = "(habitacionId, usuarioId, inicio,fin) VALUES(?,?,?,?)";
            break;

        case "habitacion":
            data = [entity.hotelId, entity.nivel, entity.aforo, entity.camasPersonales, entity.camasDoble, entity.precio];
            valuesString = "(hotelId,nivel,aforo,camasPersonales,camasDoble,precio) VALUES(?,?,?,?,?,?)";
            break;

        default:
            break;
    }

    return new Promise((resolve, reject) => {
        conecction.query(`INSERT INTO ${table}${valuesString}`, data, (err) => {
            if (err) {
                console.log(data);
                console.log(valuesString);
                return console.error(err.message, "asd");
            }
            console.log(`${table} creada`);

            resolve("done");

            conecction.end();
        });
    });
};

const update = (table, id, column, value) => {
    const conecction = mysql.createConnection({
        user: config.dbUser,
        host: config.dbHost,
        password: config.dbPassword,
        database: config.dbName,
    });

    console.log(table, id, column, value);
    conecction.query(`UPDATE ${table} SET ${column} = "${value}" WHERE ${table + "ID"}=${id}`, (err) => {
        if (err) return console.error(err.message);
        console.log(`${table} actualizado`);
    });

    conecction.end();
};

module.exports = {
    getAll,
    get,
    deleteOne,
    create,
    update,
};
