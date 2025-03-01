// backend/routes/adminRoutes.js
import express from "express";
import {
  addSchoolInfo,
  updateSchoolInfo,
  deleteSchoolInfo,
  getSchoolInfo,
  deleteImageFromCloudinary, // New controller function for deleting images
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes FIRST
router.get("/schoolinfo/public", (req, res) => {
  // console.log('PUBLIC ROUTE HIT');
  getSchoolInfo(req, res);
});

// Protected routes AFTER
router.use(authenticateAdmin); // Applies to routes below
router.get("/schoolinfo", getSchoolInfo);
router.post("/schoolinfo", addSchoolInfo);
router.put("/schoolinfo/:id", updateSchoolInfo);
router.delete("/schoolinfo/:id", deleteSchoolInfo);

// New route: Delete an image from Cloudinary (and database) by its id
router.delete("/gallery/:id", deleteImageFromCloudinary);

export default router;
