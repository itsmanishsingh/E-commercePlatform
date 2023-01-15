import mongoose, { model } from "mongoose";
import AuthRoles from '../utils/authRoles';
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

module.exports = mongoose.model("User",userSchema)