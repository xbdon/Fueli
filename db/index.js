require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: process.env.SQL_KEY,
    port: 5432,
    max: 5,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 20000,
    allowExitOnIdle: false
});

const getDatabase = async () => {
    const client = await pool.connect(process.env.DATABASE_URL);
    const { rows } = await client.query('SELECT * FROM coins')
    console.log(rows);
    client.release(true);
}

getDatabase();