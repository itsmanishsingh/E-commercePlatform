import mongoose, { model } from "mongoose";
import AuthRoles from '../utils/authRoles';
import bcrypt from 'bcryptjs';
import { Jwt } from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index";


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

// Challenge-1 Encrypt the password - hooks

userSchema.pre("Save", async function(next){           // We are encrypting the password before "saving" 
    if(!this.isModified("password"))return next();       // In this case if the password is not modified then move directly to the next();// If the modified is true i.e the password is modified then execute the code below
    // if(this.modified("password")){}  // Here if the password is modified then only move to the code below or else directly skip to next();
    this.password = await bcrypt.hash( this.password , 10);
    next();
})

// Adding more features to schema

userSchema.methods = {
    // Comparing the password
    comparePassword : async function(enteredPassword){
        return await bcrypt.compare(enteredPassword ,this.password);
    },

    // Generating JWT 
    getJwtToken:function(){
        return JWT.sign(
            {
                _id: this.id,
                role: this.role
            },
            config.JWT_SECRETKEY,
            {
                expiresIn:config.JWT_EXPIRY
            }
        )
    }

}


module.exports = mongoose.model("User",userSchema)