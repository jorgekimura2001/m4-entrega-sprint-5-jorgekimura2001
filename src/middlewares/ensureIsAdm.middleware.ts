import { NextFunction, Request, Response } from "express"

const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const {isAdm} = req.user 
    
    if(!isAdm) {
        return res
                .status(403)
                .json({
                    message: "Unauthorized"
                })
    }
    next() 
}

export default ensureIsAdmMiddleware