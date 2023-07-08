const { get, getAll, deleteOne, update, create } = require("../lib/tables");

const getHotels = async () => {
    const hotels = await getAll("hotel");
    return hotels;
};

const getHotel = async (id) => {
    const hotel = await get("hotel", id);
    return hotel;
};

const deleteHotel = (id) => {
    deleteOne("hotel", id);
};

//entity json {hotelId,direccion,niveles,distrito}
const createHotel = (entity) => {
    create("hotel", entity);
};

const updateHotel = (id, column, value) => {
    update("hotel", id, column, value);
};

module.exports = { getHotel, getHotels, deleteHotel, createHotel, updateHotel };
