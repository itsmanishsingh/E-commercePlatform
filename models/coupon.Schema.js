import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
    {
        code:{
            type:String,
            required :[true,"Please provide a coupon "]
        },
        discount:{
            type:Number,
            default:0
        },
        active:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }

)