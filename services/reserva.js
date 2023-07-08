const { get, getAll, deleteOne, update, create } = require("../lib/tables");
const { verificarReserva, getConstancia, getReservaId } = require("../lib/scripts");

const getReservas = async () => {
    const reservas = await getAll("reserva");
    return reservas;
};

const getReserva = async (id) => {
    const reserva = await get("reserva", id);
    return reserva;
};

const deleteReserva = (id) => {
    deleteOne("reserva", id);
};

const createReserva = async (entity) => {
    if (await verificarReserva(entity)) {
        const done = await create("reserva", entity);

        const reservaId = await getReservaId(entity.habitacionId, entity.inicio, entity.fin);
        const constancia = await getConstancia(reservaId.reservaId);
        return constancia;
    } else {
        throw new Error("Cruce de reservas");
    }
};

const updateReserva = (id, column, value) => {
    update("reserva", id, column, value);
};

module.exports = { getReserva, getReservas, deleteReserva, createReserva, updateReserva };
