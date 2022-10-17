import { Router } from "express";
import { sessionLoginController } from "../controllers/sessions.controller";

const sessionRouters = Router()

sessionRouters.post('', sessionLoginController)

export default sessionRouters