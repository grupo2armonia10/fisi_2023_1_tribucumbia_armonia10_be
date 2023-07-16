const express = require("express");
const { getReserva, getReservas, deleteReserva, createReserva, updateReserva } = require("../services/reserva");

const reservaRutas = (app) => {
    const router = express.Router();
    app.use("/ne-reserva-habitaciones/br/servicio-al-cliente/v1", router);

    router.get("/listar-reservas", async (req, res, next) => {
        try {
            const data = await getReservas();
            res.status(200).json({
                datos: data,
                mensaje: "Lista de reservas recibida",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/listar-reservas/:reservaId", async (req, res, next) => {
        try {
            const data = await getReserva(req.params.reservaId);
            res.status(200).json({
                datos: data,
                mensaje: "Reserva Recibida",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/agregar-reservas", async (req, res, next) => {
        try {
            const constancia = await createReserva(req.body);

            res.status(200).json({
                mensaje: "Reserva Creada Correctamente",
                datos: constancia,
            });
        } catch (err) {
            console.error(err.message);
            res.status(400).json({
                erorr: err.message,
            });
        }
    });

    router.delete("/eliminar-reservas/:reservaId", async (req, res, next) => {
        try {
            deleteReserva(req.params.reservaId);
            res.status(200).json({
                mensaje: "Reserva Eliminada",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.put("/actualizar-reservas/:reservaId", async (req, res, next) => {
        try {
            updateReserva(req.params.reservaId, req.body.columna, req.body.valor);
            res.status(200).json({
                mensaje: "Reserva Actualizado",
            });
        } catch (err) {
            console.error(err.message);
        }
    });
};

module.exports = reservaRutas;
