// models/MandatoryDisclosure.js
import mongoose from "mongoose";

const MandatoryDisclosureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    driveFileId: { type: String, required: true },
    webViewLink: { type: String }, // URL to view the file in a browser
    webContentLink: { type: String }, // URL for direct download if needed
  },
  { timestamps: true }
);

export default mongoose.model("MandatoryDisclosure", MandatoryDisclosureSchema);
