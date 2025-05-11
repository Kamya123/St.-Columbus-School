// backend/models/Teacher.js
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  image: { type: String, required: true },
  public_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Teacher', teacherSchema);