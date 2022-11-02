import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async(id: string): Promise<void> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id})

    if(!user){
       throw new AppError('User not found', 404)
    }

    if(user.isActive === true){
        await userRepository.update(id, {isActive: false})
    }else{
        throw new AppError('User is disabled')
    }

}

export default deleteUserService