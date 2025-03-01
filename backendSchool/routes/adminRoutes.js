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

export default router;

// const router = express.Router();

// // Public route to get school info (no authentication)
// // In adminRoutes.js
// router.get("/schoolinfo/public", (req, res) => {
//   console.log('PUBLIC ROUTE HIT'); // Check Render logs for this
//   getSchoolInfo(req, res);
// });

// // Protected routes for admin management:
// router.get("/schoolinfo", authenticateAdmin, getSchoolInfo);
// router.post("/schoolinfo", authenticateAdmin, addSchoolInfo);
// router.put("/schoolinfo/:id", authenticateAdmin, updateSchoolInfo);
// router.delete("/schoolinfo/:id", authenticateAdmin, deleteSchoolInfo);

// export default router;
