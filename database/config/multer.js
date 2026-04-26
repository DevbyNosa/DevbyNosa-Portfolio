import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


// Cloudinary Api
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Setting Multer nMiddlware
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
   folder: 'devbynosa',
   //upload_preset: 'devbynosa_preset',
   allowed_formats: ['jpg', 'svg', 'png', 'jpeg', 'webp',],
   public_id: (req, file) => Date.now() + '_' + file.originalname.split('.')[0],
  },
})

export const upload = multer({
  storage: storage
})
