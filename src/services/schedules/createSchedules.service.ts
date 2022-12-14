import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async ({ date, hour, propertyId }: IScheduleRequest, userId: string): Promise<SchedulesUserProperties> => {

  const propertyRepository = AppDataSource.getRepository(Properties);

  const schedulesRepository = AppDataSource.getRepository(SchedulesUserProperties);

  const userRepository = AppDataSource.getRepository(User);

  const properties = await propertyRepository.findOneBy({ id: propertyId });

  const user = await userRepository.findOneBy({ id: userId });

  if (!properties) {
    throw new AppError("Property not found", 404);
  }

  const dateTime = new Date(date + " " + hour);

  const weekDay = dateTime.getDay();

  const hourTrated = dateTime.getHours();

  const schedules = await schedulesRepository.findOneBy({
     date,
     hour,
  });

  if (weekDay === 0 || weekDay === 6) {
    throw new AppError("Date invalid");
  }
  
  if (hourTrated <= 8 || hourTrated >= 18) { 
    throw new AppError("Hour invalid");
  }

  if (schedules) {
    throw new AppError("Schedules already exists");
  }

  const newSchedules = schedulesRepository.create({
    user: user!,
    properties: properties,
    date,
    hour,
  });

  await schedulesRepository.save(newSchedules)

  return newSchedules;
};

export default createSchedulesService;
