import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (
  { date, hour, propertyId }: IScheduleRequest,
  userId: string
) => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const schedulesRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );

  const userRepository = AppDataSource.getRepository(User);

  const properties = await propertyRepository.findOneBy({
    id: propertyId,
  });

  const user = await userRepository.findOneBy({ id: userId });

  if (!properties) {
    throw new AppError("Property not found", 404);
  }

  const dateTime = new Date(date + " " + hour);

  const dateTreated = `${dateTime.getFullYear()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getDate()}`;

  const timeTreated = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;

  const weekDay = dateTime.getDay();

  const hourTrated = dateTime.getHours();

  const schedules = await schedulesRepository.findOneBy({
    properties,
    date: dateTreated,
    hour: timeTreated,
  });

  console.log(schedules);

  if (schedules) {
    throw new AppError("Schedules already exists");
  }

  if (weekDay === 0 && weekDay > 5) {
    throw new AppError("Date invalid");
  }

  if (hourTrated < 8 && hourTrated > 18) {
    throw new AppError("Hour invalid");
  }

  const newSchedules = schedulesRepository.create({
    user: user!,
    properties: properties,
    date: dateTreated,
    hour: timeTreated,
  });

  return newSchedules;
};

export default createSchedulesService;
