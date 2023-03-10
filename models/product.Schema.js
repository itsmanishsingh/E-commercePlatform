import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // 1- Name
        name:{
            type:String,
            trim,
            required:[true,"please provide the name of the product"],
            maxlength:[120,"Product name cannot be more than 120 characters"],
        },

        // 2- price
        price:{
            type:Number,
            required:[true,"Please provide the price of the product"],
            maxlength:[5 , "Product price cannot be more than 5 digits"]
        },
        // 3- description
        description:{
            type:String,
            trim
        },
        // 4- Photo
        photos:[
            {
                secure_url:{            // Getting the url from cloudinary platform
                    type:String,
                    required:true
                }
            }
        ],
        // 5- stock
        stock:{
            type:Number,
            default:0
        },
        // 6- sold
        sold:{
            type:Number,
            default:0,
        },
        //7-collection connection
                //Each product should be a part of collection,
                //Trying to keep the refernce of another schema
        
        collectionId:{
            type:mongoose.Schema.Types.ObjectId,     //This code is always same if you are trying to refer schema from another Schema
            ref:"Collection"                         // Referenced to anther schema- "Schema name"
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model('Product',productSchema);