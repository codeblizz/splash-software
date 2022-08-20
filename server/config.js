const dotenv = require("dotenv");

const { PORT } = dotenv.config({ path: __dirname + "/../.env"}).parsed;

const config = {
    PORT
}

module.exports = config;
