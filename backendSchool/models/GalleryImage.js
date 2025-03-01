// backend/models/GalleryImage.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }, // Cloudinary public ID
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
