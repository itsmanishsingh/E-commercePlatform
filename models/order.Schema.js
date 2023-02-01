import mongoose from "mongoose";
import DeliveryStatus from "../utils/delivery.Status";
const orderSchema = new mongoose.Schema(
    {
        product:{
            type:[
                {
                    productId:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Product",
                        required:true
                    },
                    count:Number,
                    price:Number
                }
            ],
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        amount:{
            type:Number,
            required:true
        },
        coupon:{ 
            type:String
        },
        transactionId:{ 
            type:Number
        },
        status:{
            type:String,
            enum:Object.values(DeliveryStatus),
            default:DeliveryStatus.ORDERED
            /*
              enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
              default:"ORDERED"
            */
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model('Order',orderSchema);