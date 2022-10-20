import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";

export const createSchedulesController = async(req: Request, res: Response) => {

    const {id: userId} = req.user
    const data = req.body
    await createSchedulesService(data, userId)

    return res.status(201).json({
        message: 'Schedules created with sucess'
    })
}