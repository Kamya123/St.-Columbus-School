// backend/models/GalleryImage.js
import mongoose from "mongoose";

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
}, { timestamps: true });

const GalleryImage = mongoose.model("GalleryImage", GalleryImageSchema);
export default GalleryImage;
