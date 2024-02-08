import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async(req,res,next)=>{

    const {id}= req.query;

    if(!id) return next(new ErrorHandler("You need to LogIn first",401 ))

    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("Id Invalid", 401))

    if(user.role !== "admin")
     return next(new ErrorHandler("You don't have permission to access", 401))

     next();
});