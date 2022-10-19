import AppDataSource from '../../data-source'
import { Category } from '../../entities/categories.entity'
import { AppError } from '../../errors/appError'
import {ICategoryRequest} from '../../interfaces/categories'

const createCategoryService = async({name}: ICategoryRequest): Promise<Category> => {
    const categoryRepository = AppDataSource.getRepository(Category)

    const categoryAlreadyExists = await categoryRepository.findOneBy({name})

    if(categoryAlreadyExists){
        throw new AppError('Category already exists')
    }

    const newCategory = await categoryRepository.save({
        name: name
    })

    return newCategory
}

export default createCategoryService