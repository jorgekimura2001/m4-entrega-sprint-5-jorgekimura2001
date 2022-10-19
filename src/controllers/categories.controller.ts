import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesCategoryService from "../services/categories/listPropertiesCategory.service";

export const createCategoryController = async(req: Request, res: Response) => {
    
    const {name}:ICategoryRequest = req.body

    const categoryCreated = await createCategoryService({name})

    return res.status(201).json(categoryCreated)
}

export const listCategoriesController = async(req: Request, res: Response) => {
    
    const categories = await listCategoriesService()

    return res.json(categories)

}

export const listPropertiesCategoryController = async(req: Request, res: Response) => {

    const {id} = req.params

    const propertiesByCategory = await listPropertiesCategoryService(id)

    return res.json(propertiesByCategory)
}

