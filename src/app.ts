import express from 'express';
import { Pool } from 'pg';
import { initDB } from './db/index.js';
import { pool } from './db/index.js';
import { userRoute } from './modules/users/user.route.js';
import fs from 'fs';

// middleware
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // console.log("Method -> URL -> Time:   ", req.method, " -> ", req.url, " -> ", new Date().toISOString());    
    
    const log = `Method: ${req.method} | URL: ${req.url} | Time: ${new Date().toISOString()}`;
    console.log(log);

    fs.appendFile("logging.txt", log + "\n", (err) => {
        if (err) {
            console.error("Error writing to log file", err);
        }
    });

    next();
})

// routes
app.use("/api/v1/users", userRoute);

// REST_API_CRUD

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

export default app;