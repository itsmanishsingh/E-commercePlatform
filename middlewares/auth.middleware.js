import User from "../models/user.Schema"
import { Jwt } from "jsonwebtoken"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import config from "../config/index"


// here in the ( ,_res , next) --- "_res" is written which indicates the _res is not called or perhaps used
export const isloggedIn = asyncHandler( async (req,_res,next)=>{
    let token;
    
    if( req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookies.token || req.headers.authorization.splits(" ")[1];
    }

    if(!token)
    throw new CustomError(`Not authorized to access this route`,400);

    try {
        const decodeJwtPayload = JWT.verify(token , config.JWT_SECRETKEY);
        // id ,find user based on id , set this in req.user

        req.user = await User.findById(decodeJwtPayload._id,"name email role")        // (decodeJwtPayload._id,"name email role")--here name ,email , role are mentioned so that only those details are sent or else it will send all the Schema data related to the user
        next();
    } catch (err) {
        throw new CustomError(`Not authorized to access this route` , 400)
    }

})