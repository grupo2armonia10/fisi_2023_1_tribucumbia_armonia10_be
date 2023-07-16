const express = require("express");
const { getUser, getUsers, createUser, deleteUser, updateUser } = require("../services/usuario");
const validationHandler = require("../util/middlewares/validationHandler");
const { usuariosIdSchemaObject, updateUsuarioSchema, createUsuarioSchema } = require("../util/schemas");

const hotelApi = (app) => {
    const router = express.Router();
    app.use("/ne-reserva-habitaciones/br/servicio-al-cliente/v1", router);

    router.get("/agregar-usuarios", async (req, res, next) => {
        try {
            const data = await getUsers();
            res.status(200).json({
                datos: data,
                mensaje: "Usuarios recibidos",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/agregar-usuarios/:usuarioId", validationHandler(usuariosIdSchemaObject, "params"), async (req, res, next) => {
        try {
            const data = await getUser(req.params.usuarioId);
            res.status(200).json({
                datos: data,
                mensaje: "Usuario Recibido",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete("/eliminar-usuarios/:usuarioId", validationHandler(usuariosIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteUser(req.params.usuarioId);
            res.status(200).json({
                mensaje: "Usuario eliminado correctamente",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/agregar-usuarios", validationHandler(createUsuarioSchema), async (req, res, next) => {
        try {
            createUser(req.body);
            res.status(200).json({
                mensaje: "Usuario creado correctamente",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    router.put(
        "/actualizar-usuarios/:usuarioId",
        validationHandler(usuariosIdSchemaObject, "params"),
        validationHandler(updateUsuarioSchema),
        async (req, res, next) => {
            try {
                updateUser(req.params.usuarioId, req.body.columna, req.body.valor);
                res.status(200).json({
                    mensaje: "Usuario actualizado correctamente",
                });
            } catch (err) {
                console.error(err.message);
            }
        }
    );
};

module.exports = hotelApi;
