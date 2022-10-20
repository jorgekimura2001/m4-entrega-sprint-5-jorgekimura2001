import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedules_user_properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string) => {
  const schedulesRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );

  const propertyRepository = AppDataSource.getRepository(Properties);

  const property = await propertyRepository.findOneBy({ id });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const schedules = await schedulesRepository.find({
    where: {
      properties: property,
    },
    relations: {
      properties: true,
    },
  });

  return schedules;
};

export default listSchedulesService;
