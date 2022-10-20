import { Router } from "express";
import { createPropertyController, listPropertiesController } from "../controllers/properties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertyRouters = Router()

propertyRouters.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, createPropertyController)
propertyRouters.get('', listPropertiesController)

export default propertyRouters