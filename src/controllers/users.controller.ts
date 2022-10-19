import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async(req: Request, res: Response) => {
    const data = req.body

    const createdUser = await createUserService(data)

    return res.status(201).json(instanceToPlain(createdUser))
}

export const listUsersController = async(req: Request, res: Response) => {

    const users = await listUsersService()

    return res.send(instanceToPlain(users))

}

export const updateUserController = async(req: Request, res: Response) => {

    const data = req.body
    const {id} = req.params
    const {isAdm, id: idUser} = req.user

    const updatedUser = await updateUserService(data, id, isAdm, idUser)

    return res.json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const {id} = req.params

    await deleteUserService(id)

    return res.status(204).json()

}