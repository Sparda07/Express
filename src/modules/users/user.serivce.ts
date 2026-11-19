
import { pool } from '../../db/index.js';   
import type { IUser } from './user.interface.js';


const createUserIntoDB = async(payLoad : IUser) => {

      // console.log(req.body);

    const { name, email, age, password } = payLoad;
    // console.log(pass);

    const result = await pool.query(`
        INSERT INTO users (name, email, age, password)
        VALUES ($1, $2, $3, $4) RETURNING *;
        `, [name, email, age, password]);

        // console.log(result);

        return result;

}


export const userService = {
    createUserIntoDB
}