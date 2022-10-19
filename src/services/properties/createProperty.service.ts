import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Category } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async({address, categoryId, value, size}: IPropertyRequest): Promise<Properties> => {
    
    const propertyRepository = AppDataSource.getRepository(Properties)

    const categoryRepository = AppDataSource.getRepository(Category)

    const addressRepository = AppDataSource.getRepository(Addresses)

    const category = await categoryRepository.findOneBy({id: categoryId})

    if(!category){
        throw new AppError('Category not found', 404)
    }

    const addressAlreadyExists = await addressRepository.findOne({
        where: {
            ...address // ta validando se o endereço passado existe atraves de todos os campos passados
        }
    })

    if(addressAlreadyExists){
        throw new AppError("Address already exists");
    }

    if(address.state.length !== 2){
        throw new AppError('Invalid state')
    }

    if(address.zipCode.length !== 8){
        throw new AppError('Invalid zipCode')
    }

    const newAddress = addressRepository.create(address)

    await addressRepository.save(newAddress)

    const newProperty = propertyRepository.create({
        address: newAddress,
        category: category,
        value,
        size
    })

    await propertyRepository.save(newProperty)

    return newProperty

}

export default createPropertyService