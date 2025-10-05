const dotenv = require("dotenv");
dotenv.config();
const {Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres_db',
    password: process.env.DB_PASSWORD || 'postgres123',
    port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
    console.log("🔗 Connected to the database");

});

module.exports = pool;