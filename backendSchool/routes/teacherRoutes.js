// backend/routes/teacherRoutes.js
import express from 'express';
import {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
// router.get('/public', getTeachers);

// Protected routes
// router.use(authenticateAdmin);
router.get('/', getTeachers);
router.post('/', addTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;