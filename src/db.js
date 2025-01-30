import { DatabaseSync } from 'node:sqlite'
const db = new DatabaseSync(':memory:')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    `)

db.exec(`
        CREATE TABLE watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            coin TEXT UNIQUE,
            ticker TEXT,
            coin_id TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        `)

export default db





// require("dotenv").config();
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "coin_list",
//     password: process.env.SQL_KEY,
//     port: 5432
// });

// module.exports = pool;




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