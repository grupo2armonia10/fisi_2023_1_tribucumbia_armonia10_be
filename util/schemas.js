const Joi = require("joi");

//Hotel
const hotelIdSchema = Joi.number().integer().min(1).max(1000);
const hotelIdSchemaObject = Joi.object({ hotelId: hotelIdSchema.required() });
const direccionSchema = Joi.string().min(1).max(60);
const nivelesSchema = Joi.number().integer().min(1).max(100);
const distritoSchema = Joi.string().alphanum().min(1).max(20);
const ciudadSchema = Joi.string().alphanum().min(1).max(20);

//Usuario
const usuarioIdSchema = Joi.number().integer().min(1).max(10000);
const usuariosIdSchemaObject = Joi.object({ usuarioId: usuarioIdSchema.required() });
const nombresSchema = Joi.string().regex(/^[a-zA-Z ]{2,30}$/);
const apellidosSchema = Joi.string().regex(/^[a-zA-Z ]{2,30}$/);
const correoSchema = Joi.string().email();
const telefonoSchema = Joi.number().integer().min(100000).max(99999999999);
const passwordSchema = Joi.string().regex(/^[a-zA-Z0-9]{5,20}$/);

//Habitacion
const habitacionIdSchema = Joi.number().integer().min(1).max(1000);
const habitacionIdSchemaObject = Joi.object({ habitacionId: habitacionIdSchema.required() });
const nivelSchema = Joi.number().integer().min(1).max(100);
const aforoSchema = Joi.number().integer().min(1).max(1000);
const camasPersonalesSchema = Joi.number().integer().min(0).max(10);
const camasDobleSchema = Joi.number().integer().min(0).max(10);
const precioSchema = Joi.number().min(0).max(10000);

//Reserva
const reservaIdSchema = Joi.number().integer().min(1).max(100000);
const inicioSchema = Joi.date();
const finSchema = Joi.date().greater(Joi.ref("inicioSchema"));

//Requests schemas

const createUsuarioSchema = Joi.object({
    nombres: nombresSchema.required(),
    apellidos: apellidosSchema.required(),
    correo: correoSchema.required(),
    telefono: telefonoSchema.required(),
    password: passwordSchema.required(),
});

const updateUsuarioSchema = Joi.object({
    columna: Joi.string().min(1).max(15).required(),
    valor: passwordSchema.required() || inicioSchema.required() || precioSchema.required() || aforoSchema.required() || nombresSchema.required(),
});

const createHotelSchema = Joi.object({
    direccion: direccionSchema.required(),
    niveles: nivelesSchema.required(),
    distrito: distritoSchema.required(),
    ciudad: ciudadSchema.required(),
});

const updateHotelSchema = Joi.object({
    columna: Joi.string().min(1).max(15).required(),
    valor: direccionSchema.required() || direccionSchema.required() || distritoSchema.required(),
});

const createHabitacionSchema = Joi.object({
    hotelId: hotelIdSchema.required(),
    nivel: nivelSchema.required(),
    aforo: aforoSchema.required(),
    camasPersonales: camasPersonalesSchema.required(),
    camasDoble: camasDobleSchema.required(),
    precio: precioSchema.required(),
});

const updateHabitacionSchema = Joi.object({
    columna: Joi.string().min(1).max(15).required(),
    valor:
        precioSchema.required() ||
        camasDobleSchema.required() ||
        camasPersonalesSchema.required() ||
        aforoSchema.required() ||
        nivelSchema.required() ||
        hotelIdSchema.required(),
});

module.exports = {
    updateHabitacionSchema,
    updateHotelSchema,
    updateUsuarioSchema,
    createHabitacionSchema,
    createHotelSchema,
    createUsuarioSchema,
    hotelIdSchemaObject,
    habitacionIdSchemaObject,
    usuariosIdSchemaObject,
};
