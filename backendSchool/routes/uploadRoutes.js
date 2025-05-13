// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Image from "../models/GalleryImage.js";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Dynamic storage configuration
const createStorage = (folder) => new CloudinaryStorage({
  cloudinary,
  params: {
    folder: `school-app/${folder}`,
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`
  }
});

// Middlewares for different upload types
const galleryUpload = multer({ storage: createStorage("school-gallery") });
const teacherUpload = multer({ storage: createStorage("teacher-profiles") });

// Gallery image upload (saves to GalleryImage collection)
router.post("/gallery", galleryUpload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      url: req.file.path,
      public_id: req.file.filename,
    });
    await newImage.save();
    res.status(201).json({ message: "Gallery image uploaded", image: newImage });
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({ error: "Gallery image upload failed" });
  }
});

// Teacher image upload (doesn't save to GalleryImage)
router.post("/teacher", teacherUpload.single("image"), async (req, res) => {
  try {
    // Just return the upload details without saving to GalleryImage
    res.status(201).json({
      message: "Teacher image uploaded",
      image: {
        url: req.file.path,
        public_id: req.file.filename
      }
    });
  } catch (error) {
    console.error("Teacher upload error:", error);
    res.status(500).json({ error: "Teacher image upload failed" });
  }
});

export default router;
