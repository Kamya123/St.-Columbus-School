// backend/controllers/schoolInfrastructureController.js
import SchoolInfrastructure from "../models/SchoolInfrastructure.js";

// Get all school infrastructure info records
export const getSchoolInfrastructure = async (req, res) => {
  try {
    const schoolInfrastructure = await SchoolInfrastructure.find();
    res.status(200).json(schoolInfrastructure);
  } catch (error) {
    res.status(500).json({ error: "Error fetching school infrastructure information" });
  }
};

// Add new school infrastructure information
export const addSchoolInfrastructure = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newInfo = new SchoolInfrastructure({ title, description });
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(500).json({ error: "Error adding school infrastructure information" });
  }
};

// Update school infrastructure information by ID
export const updateSchoolInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfo = await SchoolInfrastructure.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Error updating school infrastructure information" });
  }
};

// Delete school infrastructure information by ID
export const deleteSchoolInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    await SchoolInfrastructure.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting school infrastructure information" });
  }
};


