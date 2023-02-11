import Collection from "../models/collection.Schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"


/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/


export const createCollection = asyncHandler( async ( req, res)=>{
    const { name } = req.body
    if(!name){
        throw new CustomError(`name can't be empty ` , 400)
    }

    const collection = await Collection.create({
        name : name
    })

    res.status(201).json({
        success : true,
        message : "Collection created Successfully",
        collection
    })

})


/******************************************************
 * @Update_COLLECTION
 * @route http://localhost:5000/api/collection/update
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const updatedCollection = asyncHandler( async( req, res )=>{
    // Updating the new collections
    const name = req.body

    // updating the existing collection
    const {id : collectionId } = req.params

    if(!name){
        throw new CustomError(`Collection Name is required `,401)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name,
        },
        {
            new :true,
            runValidator : true
        }
    )

    if(!updatedCollection){
        throw new CustomError(`Collections could not be found`,401)
    }

    res.status(201).json({
        success:true,
        message:`Collection successfully Updated `,
        updatedCollection

    })

})


/******************************************************
 * @Delete_COLLECTION
 * @route http://localhost:5000/api/collection/delete
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const deleteCollection = asyncHandler( async ( req, res)=>{

    const collectionId = await req.params
    if(!collectionId){
        throw new CustomError( ` Please give the proper id ` , 400)
    }

    const CollectionToDelete = await Collection.findByIdAndDelete(collectionId)

    if(!CollectionToDelete){
        throw new CustomError(`Deletion failed `)
    }

    CollectionToDelete.remove()  // This is to remove the "CollectionToDelete" variable since it is of no use in the further code
    res.status(201).json({
        success:true,
        message:"Collection deleted Successfully"
    })

})


/******************************************************
 * @List_COLLECTION
 * @route http://localhost:5000/api/collection/List
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/


export const CollectionList = asyncHandler( async (req,res)=>{

    const collectionlist = await req

    if(!collectionlist){
        throw new CustomError(`No collection found in the DB`,400)
    }
    res.status(201).json({
        success:true,
        collectionlist
    })

})