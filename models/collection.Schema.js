import mongoose from "mongoose";

const collectionSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required :[true,"Please provide the name"],
            trim : true,
            maxLength:[120 , "Collection should not be more than 120 characters"]
        },
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Collection",collectionSchema);