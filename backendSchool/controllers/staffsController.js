// backend/controllers/adminController.js
import Staffs from "../models/Staffs.js";

// Get all staff info records
export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staffs.find();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching staff information" });
  }
};

// Add new staff information
export const addStaffs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newInfo = new Staffs({ title, description });
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(500).json({ error: "Error adding staff information" });
  }
};

// Update staff information by ID
export const updateStaffs = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = await Staffs.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Error updating staff information" });
  }
};

// Delete staff information by ID
export const deleteStaffs = async (req, res) => {
  try {
    const { id } = req.params;
    await Staffs.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting staff information" });
  }
};


