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

// Public route to get school info (no authentication)
router.get("/schoolinfo/public", getSchoolInfo);

// Protected routes for admin management:
router.get("/schoolinfo", authenticateAdmin, getSchoolInfo);
router.post("/schoolinfo", authenticateAdmin, addSchoolInfo);
router.put("/schoolinfo/:id", authenticateAdmin, updateSchoolInfo);
router.delete("/schoolinfo/:id", authenticateAdmin, deleteSchoolInfo);

export default router;
