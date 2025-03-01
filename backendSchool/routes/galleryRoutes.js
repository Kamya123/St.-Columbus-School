// // backend/routes/galleryRoutes.js

import express from "express";
import Image from "../models/GalleryImage.js";

const router = express.Router();

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

export default router;
