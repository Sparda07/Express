import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const loginUserIntoDB = async (payload: {
email: string;
password: string;
}) => {
  // Check if the user exist -> Done
  // Check if the password match -> Done
  // Check the user status -> Done
  // If pass all then generate jwt token -> Done

const { email, password } = payload;

const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1    
        `,
    [email],
);
  //   console.log(user.rows[0]);
if (user.rowCount === 0) {
    throw new Error("Invalid credentials!!");
}

const matchPassword = await bcrypt.compare(password, user.rows[0].password);

if (!matchPassword) {
    throw new Error("Invalid credentials!!");
}
const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
};

const accessToken = jwt.sign(jwtPayload, config.jwt_Secret, {
    expiresIn: "1h",
});

const refreshToken = jwt.sign(jwtPayload, config.Refresh_Secret, {
    expiresIn: "10d",
});

return { accessToken, refreshToken, user: user.rows[0] };
};

export const authService = {
loginUserIntoDB,
};