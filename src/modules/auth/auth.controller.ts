import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);

        const { refreshToken } = result;

        res.cookie("refreshToken", refreshToken, {
            secure: false, // eta true hobe jkhn https use kora hobe
            httpOnly: true, // prevent xss attact
            sameSite: "lax", // prevent csrf attact
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            path: "/",
            domain : "localhost", // change this to your domain name

        })

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: result,
        });
        sendResponse(res,{
            statusCOde: 200,
            success: true,
            message: 'User logged in successfully',
            data: result,
     } );
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: error.message,
        });
    }
};


const generatedTOKEN = async (req: Request, res: Response) => {
    try {
        const result = await authService.generatedAccessTOken(req.cookies.refreshToken);
        // console.log(req.cookies.refreshToken);
        

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: result,
        });
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: error.message,
        });
    }
};




    export default generatedTOKEN;

    export const authController = {
    loginUser,
    generatedTOKEN
}