import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const listPropertiesCategoryService = async(id: string) => {

    const propertyRepository = AppDataSource.getRepository(Properties)

    const categoryRepository = AppDataSource.getRepository(Category)

    const category = await categoryRepository.findOne({
        where: {
            id
        },
        relations: {
            properties: true
        }
    })

    if(!category){
        throw new AppError('Category not found', 404)
    }

    return category
    // const properties = await propertyRepository.find()

    // const propertiesByCategory = properties.filter(property => property.category.id === id)

    // if(propertiesByCategory.length === 0){
    //     throw new AppError('Properties not found', 404)
    // }

    // return propertiesByCategory

}

export default listPropertiesCategoryService