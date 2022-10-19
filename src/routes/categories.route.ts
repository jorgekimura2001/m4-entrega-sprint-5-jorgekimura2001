import { Router } from "express";
import { createCategoryController, listCategoriesController, listPropertiesCategoryController } from "../controllers/categories.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoryRouters = Router()

categoryRouters.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, createCategoryController)
categoryRouters.get('', listCategoriesController)
categoryRouters.get('/:id/properties', listPropertiesCategoryController)

export default categoryRouters