require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "coin_list",
    password: process.env.SQL_KEY,
    port: 3000
});

module.exports = pool;

// require("dotenv").config();
// const { Client } = require('pg');

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 3000,
//     password: process.env.SQL_KEY,
//     database: "coin_list"
// })

// module.exports = client;