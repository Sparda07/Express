import type { Request, Response } from 'express';
import { pool } from '../../db/index.js';
import { userService } from './user.serivce.js';


const createUser = async(req: Request, res: Response) => {
    try {
    const result = await userService.createUserIntoDB(req.body); 

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
};



export const userController = {
    createUser
}