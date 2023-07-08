const { get, getAll, deleteOne, update, create } = require("../lib/tables");

const getUsers = async () => {
    const users = await getAll("usuario");
    return users;
};

const getUser = async (id) => {
    const user = await get("usuario", id);
    return user;
};

const deleteUser = (id) => {
    deleteOne("usuario", id);
};

//entity json {usuarioId,nombres,apellidos,correo,telefono,password}
const createUser = (entity) => {
    create("usuario", entity);
};

const updateUser = (id, column, value) => {
    update("usuario", id, column, value);
};

const asd = { hola: "asd" };
module.exports = { getUser, getUsers, deleteUser, createUser, updateUser };
