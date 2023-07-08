const express = require("express");
const { getReservasHabitacion, getReservasUsuario, verificarReserva, getConstancia, getReservaId } = require("../lib/scripts");

const anotherApi = (app) => {
    const router = express.Router();
    app.use("/api/another", router);

    router.get("/", async (req, res, next) => {
        const data = await getReservasUsuario(14);

        res.status(200).json({
            data: data,

            message: "You reached another api correctoy route",
        });
    });

    router.post("/", async (req, res, next) => {
        const reserva = req.body;
        const constancia = await getReservaId(reserva.habitacionId, reserva.inicio, reserva.fin);

        res.status(200).json({ data: constancia });
    });
};

module.exports = anotherApi;
