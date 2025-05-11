// backend/controllers/teacherController.js
import Teacher from '../models/Teacher.js';
import { v2 as cloudinary } from 'cloudinary';

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTeacher = async (req, res) => {
  const { name, subject, image, public_id } = req.body;
  try {
    const newTeacher = new Teacher({ name, subject, image, public_id });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (teacher && teacher.public_id) {
      await cloudinary.uploader.destroy(teacher.public_id);
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};