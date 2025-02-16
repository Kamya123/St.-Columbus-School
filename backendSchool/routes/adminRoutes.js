// backend/routes/adminRoutes.js
import express from "express";
import {
  addSchoolInfo,
  updateSchoolInfo,
  deleteSchoolInfo,
  getSchoolInfo,
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get school info (for admin use)
router.get("/schoolinfo", authenticateAdmin, getSchoolInfo);

// Add school information
router.post("/schoolinfo", authenticateAdmin, addSchoolInfo);

// Update school information by ID
router.put("/schoolinfo/:id", authenticateAdmin, updateSchoolInfo);

// Delete school information by ID
router.delete("/schoolinfo/:id", authenticateAdmin, deleteSchoolInfo);

export default router;
