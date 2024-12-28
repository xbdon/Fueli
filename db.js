require("dotenv").config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "coin_list",
    password: process.env.SQL_KEY,
    port: 3000
});

module.exports = pool;