import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  title: { type: String, required: true },
  driveFileId: { type: String, required: true },
  webViewLink: String,
  webContentLink: String,
}, { timestamps: true });

export default mongoose.model("Result", ResultSchema);
