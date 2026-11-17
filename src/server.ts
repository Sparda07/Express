import express from 'express';
import { Pool } from 'pg';

const app = express()
const port = 3000



const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_W4OEwic1KqCT@ep-fragrant-tree-az4mg0y2.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require"
});

// console.log(pool);

const initDB = async () => {
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
            `)
        console.log('Initializing database...');

    }catch (error) {
        console.error('Error initializing database:', error);
    }
};

initDB();




// app.get('/', (req: express.Request, res: express.Response) => {
//     // res.send('Hello World!')
//     res.status(200).json(
//         {
//             success: true,
//             message: 'Hello World!'
//         }
//     )
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/v1/users", async(req: express.Request, res: express.Response) => {
    try {
        // console.log(req.body);

    const { name, email, age, password } = req.body;
    // console.log(pass);

    const result = await pool.query(`
        INSERT INTO users (name, email, age, password)
        VALUES ($1, $2, $3, $4) RETURNING *;
        `, [name, email, age, password]);

        // console.log(result);

    res.status(201).json(
        {
            success: true,
            message: 'User created successfully',
            data: result.rows[0]
        }
    )

    }catch (error : any) {res.status(500).json(
        {
            success: false,
            message: 'Error creating user',
            error: error 
        }
    )}
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})