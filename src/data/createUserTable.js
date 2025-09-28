const pool = require("../config/db");

const createUserTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const result = await pool.query(query);
        console.log("User table created successfully");
        
    } catch (error) {
        console.log("Error creating user table", error);
    }
    
}

module.exports = {
    createUserTable
}