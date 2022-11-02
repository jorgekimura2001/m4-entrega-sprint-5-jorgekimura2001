import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

export const createSchedulesController = async(req: Request, res: Response) => {

    const {id: userId} = req.user
    const data = req.body
    await createSchedulesService(data, userId)

    return res.status(201).json({
        message: 'Schedules created with success'
    })
}

export const listSchedulesController = async(req: Request, res: Response)  => {
    
    const {id} = req.params

    const schedulesReserved = await listSchedulesService(id)

    return res.json(instanceToPlain(schedulesReserved))

}