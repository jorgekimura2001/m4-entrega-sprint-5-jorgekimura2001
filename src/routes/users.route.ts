import { Router } from "express";
import { createdUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const userRouters = Router()

userRouters.post('', createdUserController);
userRouters.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
userRouters.patch('/:id', ensureAuthMiddleware, updateUserController);
userRouters.delete('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController)


export default userRouters