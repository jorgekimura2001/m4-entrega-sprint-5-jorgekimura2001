import { compare } from "bcryptjs"
import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import { IUserLogin } from "../../interfaces/users"
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors/appError"

const sessionLoginService = async ({email, password}: IUserLogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const user = users.find(user => user.email === email)

    if(!user){
        throw new AppError('Invalid email or password', 403)
    }

    const passwordVerify = await compare(password, user.password)

    if(!passwordVerify){
        throw new AppError('Invalid email or password', 403)
    }

    const token = jwt.sign(
        { 
            isAdm: user.isAdm 
        }, 
        process.env.SECRET_KEY as string, 
        {
            expiresIn: '24h',
            subject: user.id 
        }
    )

    return token
}

export default sessionLoginService