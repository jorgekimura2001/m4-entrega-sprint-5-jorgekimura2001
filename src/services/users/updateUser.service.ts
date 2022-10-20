import { hash } from "bcrypt"
import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import { AppError } from "../../errors/appError"
import { IUserUpdate } from "../../interfaces/users"

const updateUserService = async (data: IUserUpdate, id: string, isAdm: boolean, idUser: string) => {

    if(idUser !== id && isAdm === false ){
        throw new AppError('User is not adm or user can update only himself and not others', 401)
    }

    // if(isAdm === false && idUser !== id){
    //     throw new AppError('User is not admin', 401)
    // }

    if(data.name !== undefined || data.email !== undefined || data.password !== undefined){
        const userRepository = AppDataSource.getRepository(User)
    
        const users = await userRepository.find()
    
        const user = users.find(user => user.id === id)

        if(!user){
            throw new AppError('User not found', 404)
        }
    
        const updatedUser = {
            name: data.name ? data.name : user?.name,
            email: data.email ? data.email : user?.email,
            password: data.password ? await hash(data.password,10) : user?.password 
        }

        await userRepository.update(id, updatedUser)

        const userUpdated = await userRepository.findOneBy({id}) 

        return userUpdated
    }
    
    throw new AppError("Just name/email/password can be updated", 401)

}

export default updateUserService