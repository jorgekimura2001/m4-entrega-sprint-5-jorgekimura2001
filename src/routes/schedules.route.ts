import { Router } from "express";
import { createSchedulesController, listSchedulesController } from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const schedulesRouters = Router()

schedulesRouters.post('', ensureAuthMiddleware, createSchedulesController)
schedulesRouters.get('/properties/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, listSchedulesController)

export default schedulesRouters