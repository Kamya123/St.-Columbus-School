// backend/models/Staffs.js
import mongoose from "mongoose";

const StaffsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Staffs = mongoose.model("Staffs", StaffsSchema);
export default Staffs;
