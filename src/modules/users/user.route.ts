import { Router } from 'express';
import { userController } from './user.controller.js';



const router = Router();

// custome middleware for auth -> 

const auth = (req, res, next) => {
    console.log("Auth middleware called");
    next();
}




router.get("/", auth, userController.createUser);

export const userRoute = router;