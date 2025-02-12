import dotenv from 'dotenv'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import crypto from 'crypto'
import { promisify } from 'util'

const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

const region = "us-east-1"
const bucket = "caoalbe-photo-storage"
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    signatureVersion: 'v4'
})

export async function generateUploadURL(req, res) {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucket,
        Key: imageName,
    })

    const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
        expiresIn: 60
    })

    res.send({url: uploadUrl, filename: imageName})
}