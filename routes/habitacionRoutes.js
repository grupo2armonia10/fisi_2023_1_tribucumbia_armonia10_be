const express = require("express");
const { createHabitacion, getHabitacion, getHabitaciones, deleteHabitacion, updateHabitacion } = require("../services/habitacion");
const validationHandler = require("../util/middlewares/validationHandler");
const { habitacionIdSchemaObject, createHabitacionSchema, updateHabitacionSchema } = require("../util/schemas");

const habitacionRoutes = (app) => {
    const router = express.Router();
    app.use("/ne-reserva-habitaciones/br/servicio-al-cliente/v1", router);

    router.get("/listar-habitaciones-disponibles", async (req, res, next) => {
        try {
            const data = await getHabitaciones();
            res.status(200).json({
                datos: data,
                mensaje: "Lista de habitaciones recibida ",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/detallar-habitaciones/:habitacionId", validationHandler(habitacionIdSchemaObject, "params"), async (req, res, next) => {
        try {
            const data = await getHabitacion(req.params.habitacionId);
            res.status(200).json(data);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete("/eliminar-habitaciones/:habitacionId", validationHandler(habitacionIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteHabitacion(req.params.habitacionId);
            res.status(200).json({
                message: "Habitacion eliminada correctamente",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/agregar-habitaciones", validationHandler(createHabitacionSchema), async (req, res, next) => {
        try {
            createHabitacion(req.body);
            res.status(200).json({
                message: "Habitacion creada correctamente",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.put(
        "/actualizar-habitaciones/:habitacionId",
        validationHandler(habitacionIdSchemaObject, "params"),
        validationHandler(updateHabitacionSchema),
        async (req, res, next) => {
            try {
                updateHabitacion(req.params.habitacionId, req.body.columna, req.body.valor);
                res.status(200).json({
                    message: "Habitacion actualizada correctamente",
                });
            } catch (err) {
                console.error(err.message);
            }
        }
    );
};

module.exports = habitacionRoutes;
