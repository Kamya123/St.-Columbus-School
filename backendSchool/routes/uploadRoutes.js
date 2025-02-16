// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "school-gallery", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage });

// Endpoint for uploading a single image
router.post("/", upload.single("image"), (req, res) => {
  try {
    // The file URL is available as req.file.path
    res.status(201).json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

export default router;
