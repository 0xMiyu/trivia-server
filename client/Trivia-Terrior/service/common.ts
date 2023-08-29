import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

interface GetS3PostUrlRequest {
    imageName: string,
    imageType: string
}

export const getS3PostUrl = async(data: GetS3PostUrlRequest) => {
    const {imageName, imageType} = data
    const s3 = new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        }
    })

    const post = await createPresignedPost(s3, {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: imageName,
        Fields: {
            acl: 'public-read',
            'Content-Type': imageType
        },
        Expires: 600
    })

    return post
}

export const getInternalApiUrl = () => {
    let url = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : ""
    if (!url) {
        url = "http://localhost:3000"
    }
    return url
}
