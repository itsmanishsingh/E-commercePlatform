import config from "./index"
import aws from "aws-sdk"

const S3 = new aws.S3({
    accessKeyId:config.S3_ACCESS_KEY,
    secretAccessKey:config.S3_SECRET_ACCESS_KEY,
    region:config.S3_REGION
})

export default S3;