
import { pool } from '../../db/index.js';   
import type { IUser } from './user.interface.js';
import bcrypt, { hash } from 'bcryptjs';


const createUserIntoDB = async(payLoad : IUser) => {

      // console.log(req.body);

    const { name, email, age, password, role } = payLoad;

    const hash = await bcrypt.hash(password, 10);

    // console.log(hash);

    const createUser = await pool.query(`
        INSERT INTO users (name, email, age, password, role)
        VALUES ($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *;
        `, [name, email, age, hash, role]);

        // console.log(createUser);

        return createUser;

}


    const getallUsersFromDB = async() => {
        const result = await pool.query(`SELECT * FROM users;`);
        return result;
    };


    const getSingleUserFromDB = async(id : string) => {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result;
    };


    const updateUserInDB = async(id : string, payLoad : IUser) => {
        const { name, email, age, password } = payLoad;

        const result = await pool.query(`
            UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), age = COALESCE($3, age), password = COALESCE($4, password), updated_at = NOW()
            WHERE id = $5 RETURNING *;
        `, [name, email, age, password, id]);
        return result;
    };

    const deleteUserFromDB = async(id : string) => {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        return result;
    };




export const userService = {
    createUserIntoDB,
    getallUsersFromDB,
    getSingleUserFromDB,
    updateUserInDB,
    deleteUserFromDB
}