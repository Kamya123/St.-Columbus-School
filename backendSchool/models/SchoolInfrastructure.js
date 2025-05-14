// backend/models/SchoolInfrastructure.js
import mongoose from "mongoose";

const SchoolInfrastructureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const SchoolInfrastructure = mongoose.model("SchoolInfrastructure", SchoolInfrastructureSchema);
export default SchoolInfrastructure;
