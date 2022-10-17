import { Request, Response } from "express";
import sessionLoginService from "../services/sessions/sessionLogin.service";

export const sessionLoginController = async(req: Request, res: Response) => {
        
        const {email, password} = req.body

        const token = await sessionLoginService({email, password})

        return res.status(200).json({token})

}

