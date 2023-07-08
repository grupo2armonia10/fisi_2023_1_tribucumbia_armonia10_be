const { get, getAll, deleteOne, update, create } = require("../lib/tables");

const getHabitaciones = async () => {
    const habitaciones = await getAll("habitacion");
    return habitaciones;
};

const getHabitacion = async (id) => {
    const habitacion = await get("habitacion", id);
    return habitacion;
};

const deleteHabitacion = (id) => {
    deleteOne("habitacion", id);
};

//entity json {habitacionId,hotelId,nivel,aforo,camasPersonales,camasDobles,precio}
const createHabitacion = (entity) => {
    create("habitacion", entity);
};

const updateHabitacion = (id, column, value) => {
    update("habitacion", id, column, value);
};

module.exports = { getHabitaciones, getHabitacion, deleteHabitacion, createHabitacion, updateHabitacion };
