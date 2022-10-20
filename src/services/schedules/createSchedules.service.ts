import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async({date, hour, propertyId}: IScheduleRequest, userId: string) => {

    const propertyRepository = AppDataSource.getRepository(Properties)

    const schedulesRepository = AppDataSource.getRepository(SchedulesUserProperties)

    const userRepository = AppDataSource.getRepository(User)

    const properties = await propertyRepository.findOneBy({
       id: propertyId
    })

    const user = await userRepository.findOneBy({id: userId})

    if(!properties){
        throw new AppError('Property not found', 404)
    }

    const dateTrated = new Date(date)
    const hourTrated = new Date(hour)

    if(dateTrated.getDate() < 0 && dateTrated.getDate() > 5){
        throw new AppError('Date invalid')
    }

    if(hourTrated.getHours() < 8 && hourTrated.getHours() > 18){
        throw new AppError('Hour invalid')
    }

    const schedules = await schedulesRepository.findOneBy({
        properties,
        date: dateTrated,
        hour: hourTrated
    })

    if(!schedules){
        throw new AppError("Schedules already exists");    
    }

    // await schedulesRepository.save({
    //     user,
    // })

}

export default createSchedulesService