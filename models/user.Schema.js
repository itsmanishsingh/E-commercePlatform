import mongoose from "mongoose";

/*
 const userSchema = new mongoose.Schema({})
The above and below code are the same ie the "new" word is optional
*/
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required :[true , "Name is required"],
            maxLength :[50 , "Name must be less than 50"]
        }
    }
    
    )