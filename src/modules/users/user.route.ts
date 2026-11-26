import { Router } from 'express';
import { userController } from './user.controller.js';
import auth from '../../middleare/auth.js';



const router = Router();



// api/v1/users/ -> 





router.post("/", userController.createUser);
router.get("/", auth("admin","agent"), userController.getAllUsers);
router.get("/:id", auth(), userController.getSingleUser);
router.put("/:id", auth(), userController.updateUser);
router.delete("/:id", auth(), userController.deleteUser);

export const userRoute = router;