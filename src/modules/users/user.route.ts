import { Router, type Request, type Response } from 'express';
import { pool } from '../../db/index.js';



const router = Router();

router.post("/", async(req: Request, res: Response) => {
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

export const userRoute = router;