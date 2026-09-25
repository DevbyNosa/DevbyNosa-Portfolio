import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "devbynosa",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
  },
});

const uploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});


export const uploadSingle = (field) => (req, res, next) => {
  uploader.single(field)(req, res, (err) => {
    if (err) {
      console.error("[cloudinary] upload failed:", err.message);
      return next(err);
    }
    next();
  });
};

export { cloudinary };