const express = require("express");
const { createHotel, getHotel, getHotels, deleteHotel, updateHotel } = require("../services/hotel");
const validationHandler = require("../util/middlewares/validationHandler");
const { hotelIdSchemaObject, createHotelSchema, updateHotelSchema } = require("../util/schemas");

const hotelRoutes = (app) => {
    const router = express.Router();
    app.use("/ne-reserva-habitaciones/br/servicio-al-cliente/v1", router);

    router.get("/listar-hoteles", async (req, res, next) => {
        try {
            const data = await getHotels();
            res.status(200).json({
                datos: data,
                mensaje: "Lista de Hoteles recibida",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/detallar-hoteles/:hotelId", validationHandler(hotelIdSchemaObject, "params"), async (req, res, next) => {
        try {
            const data = await getHotel(req.params.hotelId);
            res.status(200).json({
                datos: data,
                mensaje: "Hotel recibido",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete("/eliminar-hoteles/:hotelId", validationHandler(hotelIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteHotel(req.params.hotelId);
            res.status(200).json({
                mensaje: "Hotel Eliminado",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/crear-hoteles", validationHandler(createHotelSchema), async (req, res, next) => {
        try {
            createHotel(req.body);
            res.status(200).json({
                mensaje: "Hotel creado correctamente",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    // {
    //     "columna":"<nombre de la columna>",
    //     "valor": "<valor que sera actualizado>"
    // }
    router.put(
        "/actualizar-hoteles/:hotelId",
        validationHandler(hotelIdSchemaObject, "params"),
        validationHandler(updateHotelSchema),
        async (req, res, next) => {
            try {
                updateHotel(req.params.hotelId, req.body.columna, req.body.valor);
                res.status(200).json({
                    mensaje: "Hotel Actualizado",
                });
            } catch (err) {
                console.error(err.message);
            }
        }
    );
};

module.exports = hotelRoutes;
