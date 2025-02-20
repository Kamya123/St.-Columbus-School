// backend/routes/galleryRoutes.js
import express from "express";
import GalleryImage from "../models/GalleryImage.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public endpoint to get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images" });
  }
});

// Protected route to add a new image (store URL)
router.post("/", authenticateAdmin, async (req, res) => {
  const { url } = req.body;
  try {
    const newImage = await GalleryImage.create({ url });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Error adding image" });
  }
});

// Protected route to update an image (if needed)
router.put("/:id", authenticateAdmin, async (req, res) => {
  try {
    const updatedImage = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: "Error updating image" });
  }
});

// Protected route to delete an image
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image" });
  }
});

export default router;
