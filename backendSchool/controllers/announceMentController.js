// backend/controllers/announceMentController.js
import Announcement from '../models/Announcement.js';

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAnnouncement = async (req, res) => {
  const { date, title, text } = req.body;
  try {
    const newAnnouncement = new Announcement({ date, title, text });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    await Announcement.findByIdAndDelete(id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};