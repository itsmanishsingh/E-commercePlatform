import User from "../models/user.Schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import crypto from 'crypto';


export const cookieOptions ={
    expires:new Date(Date.now()+ 3 * 24 * 60 * 60 * 1000)    ,
    httpOnly:true
    //Could be in a seperate files in utils
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const signUp = asyncHandler(async (req,res)=>{
        const { name ,email , password } = req.body;
        
        if(!name || !email || !password){
            throw new CustomError(`Please fill all the fields` , 400);
        }

        //checking if the user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new CustomError(`User already exists`,400)
        }

        const user = User.create({
            name,
            email,
            password
        })

        const token = user.getJwtToken();
        console.log(user);
        user.password = undefined; //already in the user.Schema the password has been marked "select: false"

        res.cookie("token" , token , cookieOptions); // The first token is name ,second token is the above token "user.getJwtToken"

        res.status(200).json({
            success:true,
            token,
            user
        })

})


/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User login Controller for creating new user
 * @parameters email, password
 * @returns User Object
 ******************************************************/

export const login = asyncHandler(async (req,res) =>{
    const { email , password } = req.body;

    if(!email || ! password){
        throw new CustomError(`Please fill all the fields` ,400);
    }

    // The below code ".select("+password")" is used reverse the effect of "Select :false" in the User.Schema.js
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new CustomError(`Invalid Credentials` ,400);
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if( isPasswordMatched ){
        const token = user.getJwtToken()
        user.password = undefined
        res.cookie("token" , token , cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError(`Invalid Credentials` , 400)

})