// require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "coin_list",
    password: process.env.SQL_KEY,
    port: 5432,
    max: 5,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 20000,
    allowExitOnIdle: false
});

(async () => {
    const client = await pool.connect();

    const { rows } = await client.query('SELECT * FROM coins')
    console.log(rows);
    client.release(true);
})();

// quick test