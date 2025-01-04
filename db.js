require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "coin_list",
    password: process.env.SQL_KEY,
    port: 5432
});

module.exports = pool;

// const pg = require("pg");

// const client = new pg.Client({
//     host: "localhost",
//     port: 3000,
//     database: "coin_list",
//     user: "postgres",
//     password: process.env.SQL_KEY,
// })

// client.connect((err) => {
//     if (err) throw err;

//     console.log("Connection Established");
// })