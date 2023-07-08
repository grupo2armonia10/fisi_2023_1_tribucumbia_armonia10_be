const express = require("express");
const { createHabitacion, getHabitacion, getHabitaciones, deleteHabitacion, updateHabitacion } = require("../services/habitacion");
const validationHandler = require("../util/middlewares/validationHandler");
const { habitacionIdSchemaObject, createHabitacionSchema, updateHabitacionSchema } = require("../util/schemas");

const habitacionRoutes = (app) => {
    const router = express.Router();
    app.use("/api/reservar/v1/habitacion", router);

    router.get("/", async (req, res, next) => {
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

    router.get("/:habitacionId", validationHandler(habitacionIdSchemaObject, "params"), async (req, res, next) => {
        try {
            const data = await getHabitacion(req.params.habitacionId);
            res.status(200).json(data);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete("/eliminar/:habitacionId", validationHandler(habitacionIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteHabitacion(req.params.habitacionId);
            res.status(200).json({
                message: "Habitacion deleted correctly",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/crear", validationHandler(createHabitacionSchema), async (req, res, next) => {
        try {
            createHabitacion(req.body);
            res.status(200).json({
                message: "Habitacion created correctly",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    // {
    //     "column":"<name_of_the_column>",
    //     "value": "<actual_value_to_be_updated>"
    // }
    router.put(
        "/modificar/:habitacionId",
        validationHandler(habitacionIdSchemaObject, "params"),
        validationHandler(updateHabitacionSchema),
        async (req, res, next) => {
            try {
                updateHabitacion(req.params.habitacionId, req.body.columna, req.body.valor);
                res.status(200).json({
                    message: "Habitacion updated correctly",
                });
            } catch (err) {
                console.error(err.message);
            }
        }
    );
};

module.exports = habitacionRoutes;
