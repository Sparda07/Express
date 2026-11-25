
// custome middleware for auth -> 

import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    // console.log("Auth middleware called");
    // console.log(req.headers.authorization);

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    next();
}

export default auth;