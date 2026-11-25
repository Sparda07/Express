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

    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

const getAllUsers = async(req: Request, res: Response) => {
    try {
        const result = await userService.getallUsersFromDB();

        res.status(200).json(
            {
                success: true,
                message: 'Users retrieved successfully',
                data: result.rows
            }
        )
    } catch (error : any) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retrieving users',
                error: error
            }
        )
    }
};

const getSingleUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getSingleUserFromDB(id as string);

        res.status(200).json(
            {
                success: true,
                message: 'User retrieved successfully',
                data: result.rows[0]
            }
        )
    } catch (error : any) {
        res.status(500).json(
            {
                success: false,
                message: 'Error retrieving user',
                error: error
            }
        )
    }
};

const updateUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.updateUserInDB(id as string, req.body);

        res.status(200).json(
            {
                success: true,
                message: 'User updated successfully',
                data: result.rows[0]
            }
        )
    } catch (error : any) {
        res.status(500).json(
            {
                success: false,
                message: 'Error updating user',
                error: error
            }
        )
    }
};

const deleteUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserFromDB(id as string);

        res.status(200).json(
            {
                success: true,
                message: 'User deleted successfully',
                data: result.rows[0]
            }
        )
    } catch (error : any) {
        res.status(500).json(
            {
                success: false,
                message: 'Error deleting user',
                error: error
            }
        )
    }
};

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}