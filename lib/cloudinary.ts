import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  mimetype: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'chocolate-shopee/products',
        public_id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        resource_type: 'image',
        format: mimetype.split('/')[1] || 'jpg',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'))
        } else {
          resolve(result.secure_url)
        }
      }
    )
    uploadStream.end(buffer)
  })
}

export default cloudinary
