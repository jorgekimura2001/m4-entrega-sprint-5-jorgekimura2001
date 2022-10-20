import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const schedulesRouters = Router()

schedulesRouters.post('', ensureAuthMiddleware, createSchedulesController)

export default schedulesRouters