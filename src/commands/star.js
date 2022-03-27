import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'
import { MessageMedia } from 'whatsapp-web.js'

const client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

const Bucket = process.env.BUCKET_NAME

const random = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const starCommand = {
  name: 'estrela',
  execute: async () => {
    const { Contents: allPhotos } = await client.send(
      new ListObjectsCommand({
        Bucket
      })
    )

    const photoKey = allPhotos[random(0, allPhotos.length - 1)].Key

    return MessageMedia.fromUrl(`${process.env.BUCKET_URL}/${photoKey}`)
  }
}
