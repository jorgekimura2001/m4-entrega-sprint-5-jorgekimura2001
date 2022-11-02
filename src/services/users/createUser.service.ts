import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import { IUserRequestValidation } from "../../interfaces/users"
import { hash } from "bcrypt"
import { AppError } from "../../errors/appError"

const createUserService = async ({name, email, password, isAdm }: IUserRequestValidation): Promise<User> => {

    if(name === undefined || email === undefined || password === undefined || isAdm === undefined){
        throw new AppError ('Some data is missings')
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)

    if(emailAlreadyExists){
        throw new AppError('Email already exists')
    }

    const hashedPassword = await hash(password, 10)

    const newUser = {
        name,
        email,
        isAdm,
        password: hashedPassword
    }

    const createdUser = userRepository.create(newUser)

    await userRepository.save(createdUser)

    return createdUser
}

export default createUserService