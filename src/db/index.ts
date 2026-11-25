import { Pool } from 'pg';
import config from '../config/index.js';


export const pool = new Pool({
    connectionString:config.connectionString
});

// console.log(pool);

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT TRUE,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            
            );
            `);
            
            await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            bio TEXT,
            adress TEXT,
            phone_number VARCHAR(20),
            gender VARCHAR(10),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
        `);

        console.log('Database Connecnt hoise mama');

    }catch (error) {
        console.error('Database connect kor asap:', error);
        throw error;
    }

    
        
};