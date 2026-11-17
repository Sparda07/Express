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

app.get("/api/v1/users", async(req: express.Request, res: express.Response) => {

    try{

        const result = await pool.query(`
            SELECT * FROM users`)

            res.status(200).json(
        {
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows
        }
    )

            // console.log(result);

    }catch (error : any) {res.status(500).json(
        {
            success: false,
            message: 'Error retrieving user',
            error: error 
        }
    )};

});


app.get("/api/v1/users/:id", async(req: express.Request, res: express.Response) => {
    try{

        const { id } = req.params;

        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1`, [id]);

            if (result.rowCount === 0) {
                return res.status(404).json(
                    {
                        success: false,
                        message: 'User not found',
                    }
                );
            }

            console.log(result);

            res.status(200).json(
        {
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows
        }
    )



    }catch (error : any) {res.status(500).json(
        {
            success: false,
            message: 'Error retrieving user',
            error: error 
        }
    )};
});

app.put("/api/v1/users/:id", async(req: express.Request, res: express.Response) => {
    try{
            const { id } = req.params;
            const { name, email, age, password } = req.body;

            const result = await pool.query(`
                UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), age = COALESCE($3, age), password = COALESCE($4, password), updated_at = NOW()
                WHERE id = $5 RETURNING *;
            `, [name ?? null, email ?? null, age ?? null, password ?? null, id]);

            res.status(200).json(
                {
                    success: true,
                    message: 'User updated successfully',
                    data: result.rows[0]
                }
            );

    }catch (error : any) {res.status(500).json(
        {
            success: false, 
            message: 'Error updating user',
            error: error 
        }
    )}
})

app.delete("/api/v1/users/:id", async(req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *;
        `, [id]);


        if (result.rowCount === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User not found',
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                message: 'User deleted successfully',
                data: result.rows[0]
            }
        );

    }catch (error : any) {res.status(500).json(
        {
            success: false,
            message: 'Error deleting user',
            error: error
        }
    )}
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})