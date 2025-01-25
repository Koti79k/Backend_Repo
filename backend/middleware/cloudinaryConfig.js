import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dp0zj9f98' ,
  api_key: process.env.CLOUDINARY_API_KEY || '987416386646754',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'c2P1G4iQYzEOEJP_qIc9RqpmM2Q' ,
});
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "feed-photos", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export { cloudinary, upload };