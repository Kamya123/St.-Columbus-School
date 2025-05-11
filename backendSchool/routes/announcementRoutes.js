// backend/routes/announcementRoutes.js
import express from 'express';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announceMentController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
// router.get('/public', getAnnouncements);

// Protected routes
// router.use(authenticateAdmin);
router.get('/', getAnnouncements);
router.post('/', addAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;