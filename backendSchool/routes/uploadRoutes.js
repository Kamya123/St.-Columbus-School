// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Image from "../models/GalleryImage.js"; // Import the model

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

// Endpoint for uploading a single image and storing its info in MongoDB
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // req.file.path holds the Cloudinary URL
    // req.file.filename holds the Cloudinary public_id
    const newImage = new Image({
      url: req.file.path,
      public_id: req.file.filename,
    });
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

export default router;
