const express = require("express");
const userApi = require("./routes/userRoutes");
const anotherApi = require("./routes/otherRoute");
const hotelApi = require("./routes/hotelRoutes");
const habitacionApi = require("./routes/habitacionRoutes");
const reservaApi = require("./routes/reservaRutas");
const { config } = require("./config/conf");

const app = express();

//Body parser middleware
app.use(express.json());

//Routes
userApi(app);
hotelApi(app);
habitacionApi(app);
reservaApi(app);

//misterius route
anotherApi(app);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
