
// custome middleware for auth -> 

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
const auth = (...roles : any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(roles);
    // console.log("Auth middleware called");
    // console.log(req.headers.authorization);

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    const decode = jwt.verify(token, config.jwt_Secret) as jwt.JwtPayload;
    // console.log(decode);

    const user = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [decode.email]
    );

    console.log(user.rows[0]);

    if (user.rowCount === 0) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    req.user = decode;

    console.log(req);

    next();
}
}

export default auth;