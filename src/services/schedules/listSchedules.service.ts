import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string): Promise<Properties> => {

  const propertyRepository = AppDataSource.getRepository(Properties);

  const property = await propertyRepository.findOne({
      where: {
        id 
      }, 
      relations: {
        schedules: true
      }
    });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  return property;
};

export default listSchedulesService;
