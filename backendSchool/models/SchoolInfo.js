// backend/models/SchoolInfo.js
import mongoose from "mongoose";

const SchoolInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const SchoolInfo = mongoose.model("SchoolInfo", SchoolInfoSchema);
export default SchoolInfo;
