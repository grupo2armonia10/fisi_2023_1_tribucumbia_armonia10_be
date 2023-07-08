const express = require("express");
const { createHotel, getHotel, getHotels, deleteHotel, updateHotel } = require("../services/hotel");
const validationHandler = require("../util/middlewares/validationHandler");
const { hotelIdSchemaObject, createHotelSchema, updateHotelSchema } = require("../util/schemas");

const hotelRoutes = (app) => {
    const router = express.Router();
    app.use("/api/reservar/v1/hotel", router);

    router.get("/", async (req, res, next) => {
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

    router.get("/:hotelId", validationHandler(hotelIdSchemaObject, "params"), async (req, res, next) => {
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

    router.delete("/eliminar/:hotelId", validationHandler(hotelIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteHotel(req.params.hotelId);
            res.status(200).json({
                mensaje: "Hotel Eliminado",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/crear", validationHandler(createHotelSchema), async (req, res, next) => {
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
        "/modificar/:hotelId",
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
