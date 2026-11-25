import { pool } from "../../db/index.js";

const createProfileIntoDb = async (payload: any ) => {
    const {
        user_id, bio,
        adress,
        phone_number,
        gender
    } = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE id = $1`, [user_id],);

        if (user.rowCount === 0) {
            throw new Error('User not found');
        }
        const result = await pool.query(`
            INSERT INTO profiles (user_id, bio, adress, phone_number, gender)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `, [user_id, bio, adress, phone_number, gender]);

        return result.rows[0];
}

        export const profileService = {
        createProfileIntoDb,
        }
        