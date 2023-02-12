import Product from "../models/product.Schema"
import formidable from "formidable"
import fs from fs           // Node files system modue ----To handle file operations like creating, reading, deleting, etc., Node.js provides an inbuilt module called FS (File System)
import { S3fileupload, deleteFile } from "../services/imageupload"
import Mongoose from "mongoose"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import config from "../config/index"


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/


export const addProduct = asyncHandler(async ( req, res)=>{

    const form = formidable({
        multiples:true,             // allowing multiple files 
        keepExtensions:true         // Checking the extension for the security purpose
    })

    form.parse( req, async function ( err, fields, files ){
        try {
            if(err){
                throw new CustomError(err.message || `Something went wrong`,500)
            }

            let productId = new Mongoose.Types.ObjectId().toHexString();
            // productId = 2345d34            " Same like mongodb _Id "
            // for photos- id -- 2345d34/photo_1
            //                -- 2345d34/photo_2

            //checking for the fields
            if(!fields.name || !fields.price || !fields.description || !fields.collectionId ){
                throw new CustomError(`Please fill all the details` , 500)
            }

            // Image handeling 
            // promise all - when all the promises are done then it returns "all the promises"
            let imgArrayResp = Promise.all(

                Object.keys(files).map(async (filekey , index)=>{
                    const element = files[filekey]

                    const data = fs.readFileSync(element.filepath)

                    const upload = await S3fileupload({
                        bucketname:config.S3_BUCKET_NAME,
                        key : `products/${productId}/photo_${index +1}.png`,
                        body:data,
                        contenttype:element.mimetype
                    })

                    return {
                        secure_url :upload.Location
                    }
                })
            )  
            
            let imgArray = await imgArrayResp;

            const product = await Product.create({
                _id:productId,
                photos:imgArray,
                ...fields,
            })

            if(!product){
                throw new CustomError(`Product was not created`,400)
            }
            //In case this fails then we need to remove the image

            res.status(201).json({
                success:true,
                product
            })

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message || "Something went wrong"
            })
        }
    })
})


