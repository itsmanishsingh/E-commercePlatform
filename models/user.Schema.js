import mongoose, { model } from "mongoose";
import AuthRoles from '../utils/authRoles';
import bcrypt from 'bcryptjs';
import { Jwt } from "jsonwebtoken";
import crypto from "crypto";


/*
 const userSchema = new mongoose.Schema({})
The above and below code are the same ie the "new" word is optional
*/
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be atleast of 8 characters"],
            select: false
        },

        role:{
            type : String,
            enum : Object.values(AuthRoles),
            default : AuthRoles.USER
        },
        forgotPasswordToken: String ,
        forgotPasswordExpiry: Date ,
    },
    {
        timestamps : true
    }
);

// Challenge-1 Encrypt the password

userSchema.pre("Save", async function(next){           // We are encrypting the password before "saving" 
    if(!this.modified("password"))return next();        // In case the modified save is only for the name then this will return next() , if the modified save is for password only then the loop will move further for the hashing purpose and follow by next() funciton will execute
    this.password = await bcrypt.hash( this.password , 10);
    next();
})



module.exports = mongoose.model("User",userSchema)