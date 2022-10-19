import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";

export const createPropertyController = async(req: Request, res: Response) => {
    
    const data: IPropertyRequest = req.body

    const propertyCreated = await createPropertyService(data)

    return res.status(201).json(propertyCreated)

}