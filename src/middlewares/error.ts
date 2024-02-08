import {NextFunction , Request, Response} from "express";
import { ControllerType } from "../types/type.js";
import ErrorHandler from "../utils/utility-class.js";

export const errorMiddleware = (
    (err: ErrorHandler,
    req:Request,
    res:Response, 
    next: NextFunction) => {
        err.message ||= "Internallll Server Error";
        err.statusCode ||= 500;

        return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

export const TryCatch = (func:ControllerType) =>  
   (req:Request, res:Response , next:NextFunction) => {
    return  Promise.resolve(func(req,res,next)).catch(next);
 };


 