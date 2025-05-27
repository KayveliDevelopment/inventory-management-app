// config.js
require('dotenv').config();
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};