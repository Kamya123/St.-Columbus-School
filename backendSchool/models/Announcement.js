// backend/models/Announcement.js
import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Announcement', announcementSchema);