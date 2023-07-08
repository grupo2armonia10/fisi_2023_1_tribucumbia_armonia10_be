// This file defines the routes of the user api, above each http method
// (get post put delete) you will find a comment indicating the way to
//  make requests properly
// In a development enviroment the url is htpp://localhost:8080//api/usuario

const express = require("express");
const { getUser, getUsers, createUser, deleteUser, updateUser } = require("../services/usuario");
const validationHandler = require("../util/middlewares/validationHandler");
const { usuariosIdSchemaObject, updateUsuarioSchema, createUsuarioSchema } = require("../util/schemas");

const hotelApi = (app) => {
    const router = express.Router();
    app.use("/api/reservar/v1/usuario", router);

    // GET METHOD: doesnt require a body or a param in the url.
    // This method returns an array of all the users from the database
    router.get("/", async (req, res, next) => {
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

    // GET METHOD: it doesn´t require a body but it does require a param in the url
    // This method returns an array with one object inside ( I'll fix it I promise)

    router.get("/:usuarioId", validationHandler(usuariosIdSchemaObject, "params"), async (req, res, next) => {
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

    // DELETE METHOD: this method requires a param but doesn´t require a body
    // please be carefull :v

    router.delete("/eliminar/:usuarioId", validationHandler(usuariosIdSchemaObject, "params"), async (req, res, next) => {
        try {
            deleteUser(req.params.usuarioId);
            res.status(200).json({
                mensaje: "User deleted correctly",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    // CREATE METHOD: this method doesn´t require a param but it does require a body
    // the body must contain a json user with all his properties (see diagram.png)
    //

    router.post("/crear", validationHandler(createUsuarioSchema), async (req, res, next) => {
        try {
            createUser(req.body);
            res.status(200).json({
                mensaje: "User created correctly",
            });
        } catch (err) {
            console.error(err.message);
        }
    });

    // PUT METHOD: This method requires a param and a body
    // the param is the user's id and the body is such as follow
    // {
    //     "column":"<name_of_the_column>",
    //     "value": "<actual_value_to_be_updated>"
    // }

    router.put(
        "/modificar/:usuarioId",
        validationHandler(usuariosIdSchemaObject, "params"),
        validationHandler(updateUsuarioSchema),
        async (req, res, next) => {
            try {
                updateUser(req.params.usuarioId, req.body.columna, req.body.valor);
                res.status(200).json({
                    mensaje: "User updated correctly",
                });
            } catch (err) {
                console.error(err.message);
            }
        }
    );
};

module.exports = hotelApi;
