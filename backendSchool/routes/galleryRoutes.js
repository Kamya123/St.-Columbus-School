import express from "express";
import jwt from "jsonwebtoken";
import Image from "../models/GalleryImage.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET /api/gallery - retrieve all stored images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// DELETE /api/gallery/:id - delete an image (admin only)
router.delete("/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: token missing" });
  }
  try {
    // Verify token using the secret key from your environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally, add further admin privilege checks here

    // Delete the image from MongoDB and retrieve the deleted document
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete image from Cloudinary using the public_id from the upload route
    if (deletedImage.public_id) {
      try {
        const result = await cloudinary.uploader.destroy(deletedImage.public_id);
        console.log("Cloudinary deletion result:", result);
      } catch (cloudErr) {
        console.error("Error deleting image from Cloudinary:", cloudErr);
        // Optionally, handle Cloudinary deletion error accordingly
      }
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(401).json({ error: "Unauthorized or invalid token" });
  }
});

export default router;
