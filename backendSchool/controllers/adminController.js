// backend/controllers/adminController.js
import SchoolInfo from "../models/SchoolInfo.js";
import { v2 as cloudinary } from "cloudinary";
import Image from "../models/GalleryImage.js";

// Get all school info records
export const getSchoolInfo = async (req, res) => {
  try {
    const schoolInfo = await SchoolInfo.find();
    res.status(200).json(schoolInfo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching school information" });
  }
};

// Add new school information
export const addSchoolInfo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newInfo = new SchoolInfo({ title, description });
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(500).json({ error: "Error adding school information" });
  }
};

// Update school information by ID
export const updateSchoolInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = await SchoolInfo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Error updating school information" });
  }
};

// Delete school information by ID
export const deleteSchoolInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await SchoolInfo.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting school information" });
  }
};


export const deleteImageFromCloudinary = async (req, res) => {
  try {
    // Find the image document using the provided id
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image from Cloudinary using its public ID
    await cloudinary.uploader.destroy(image.public_id);

    // Remove the image record from the database
    await image.deleteOne();

    res.json({ message: "Image deleted successfully from Cloudinary and database" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};
