import S3 from "../config/s3.config"
import config from "../config/index"

export const S3fileupload = async({bucketname , key , body , contenttype})=>{

    return await S3.upload({
        Bucket : bucketname,
        Key :key,
        Body : body,
        ContentType:contenttype
    })
    .promise()
}

export const deleteFile = async({ bucketname , key })=>{
    return await S3.deleteObject({
        Bucket:bucketname,
        Key:key
    })
    .promise()
}