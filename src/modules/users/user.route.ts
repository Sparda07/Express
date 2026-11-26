import { Router } from 'express';
import { userController } from './user.controller.js';
import auth from '../../middleare/auth.js';
import { USER_ROLE } from '../../types/index.js';



const router = Router();




// api/v1/users/ -> 





router.post("/", userController.createUser);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUsers);
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userController.getSingleUser);
router.put("/:id", auth(USER_ROLE.admin,  USER_ROLE.user), userController.updateUser);
router.delete("/:id", auth(USER_ROLE.admin), userController.deleteUser);

export const userRoute = router;